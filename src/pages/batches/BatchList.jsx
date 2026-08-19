import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import {
    getBatches,
    deleteBatch,
} from "../../api/batchApi";

import "./BatchList.css";


const idOf = (batch) =>
    batch?.id ||
    batch?._id;


const nameOf = (batch) =>
    batch?.name ||
    "Unnamed Batch";


const trainerOf = (batch) =>
    batch?.trainer ||
    "—";


const statusOf = (batch) =>
    batch?.status ||
    "ACTIVE";


const dateOf = (date) => {

    if (!date) {
        return "—";
    }

    return new Date(
        `${date}T00:00:00`
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};


export default function BatchList() {

    const navigate =
        useNavigate();


    const [batches, setBatches] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [exporting, setExporting] =
        useState(false);


    // =========================================================
    // LOAD
    // =========================================================

    useEffect(() => {

        loadBatches();

    }, []);


    const loadBatches = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getBatches();


            console.log(
                "BATCH API RESPONSE:",
                response
            );


            /*
             * IMPORTANT:
             * Always normalize the response.
             */

            const data =
                Array.isArray(response?.data)
                    ? response.data
                    : [];


            setBatches(data);

        } catch (err) {

            console.error(
                "Error loading batches:",
                err
            );

            setBatches([]);

            setError(
                err.response?.data?.message ||
                "Unable to load batches."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // FILTER
    // =========================================================

    const filteredBatches =
        useMemo(() => {

            const safeBatches =
                Array.isArray(batches)
                    ? batches
                    : [];


            const query =
                search
                    .trim()
                    .toLowerCase();


            return safeBatches.filter(
                (batch) => {

                    const searchableText = [

                        nameOf(batch),

                        trainerOf(batch),

                        batch?.description ||
                            "",

                        String(
                            batch?.fees ||
                            ""
                        ),

                    ]
                        .join(" ")
                        .toLowerCase();


                    const searchMatch =
                        !query ||
                        searchableText.includes(
                            query
                        );


                    const statusMatch =
                        !status ||
                        statusOf(batch) ===
                            status;


                    return (
                        searchMatch &&
                        statusMatch
                    );
                }
            );

        }, [
            batches,
            search,
            status,
        ]);


    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete =
        async (batch) => {

            const id =
                idOf(batch);


            if (!id) {

                alert(
                    "Batch ID not found."
                );

                return;
            }


            if (
                !window.confirm(
                    `Are you sure you want to delete "${nameOf(batch)}"?`
                )
            ) {

                return;
            }


            try {

                await deleteBatch(id);


                setBatches(
                    (previous) =>
                        previous.filter(
                            (item) =>
                                String(
                                    idOf(item)
                                ) !==
                                String(id)
                        )
                );


                alert(
                    "Batch deleted successfully."
                );

            } catch (err) {

                console.error(
                    "Delete error:",
                    err
                );

                alert(
                    err.response?.data ||
                    "Unable to delete batch."
                );
            }
        };


    // =========================================================
    // EXCEL EXPORT
    // =========================================================

    const exportExcel =
        () => {

            if (
                !filteredBatches.length
            ) {

                alert(
                    "There are no batches to export."
                );

                return;
            }


            try {

                setExporting(true);


                const rows =
                    filteredBatches.map(
                        (batch, index) => ({

                            "Sr. No.":
                                index + 1,

                            "Batch Name":
                                nameOf(batch),

                            "Trainer":
                                trainerOf(batch),

                            "Fees":
                                batch?.fees ??
                                "",

                            "Duration (Days)":
                                batch?.duration ??
                                "",

                            "Start Date":
                                dateOf(
                                    batch?.startDate
                                ),

                            "End Date":
                                dateOf(
                                    batch?.endDate
                                ),

                            "Status":
                                statusOf(batch),

                            "Description":
                                batch?.description ||
                                "",
                        })
                    );


                const worksheet =
                    XLSX.utils.json_to_sheet(
                        rows
                    );


                worksheet["!cols"] = [

                    { wch: 10 },
                    { wch: 25 },
                    { wch: 25 },
                    { wch: 15 },
                    { wch: 18 },
                    { wch: 18 },
                    { wch: 18 },
                    { wch: 15 },
                    { wch: 40 },

                ];


                const workbook =
                    XLSX.utils.book_new();


                XLSX.utils.book_append_sheet(
                    workbook,
                    worksheet,
                    "Batches"
                );


                const today =
                    new Date()
                        .toLocaleDateString(
                            "en-IN"
                        )
                        .replaceAll(
                            "/",
                            "-"
                        );


                XLSX.writeFile(
                    workbook,
                    `EduTrack_Batch_Report_${today}.xlsx`
                );

            } catch (err) {

                console.error(
                    "Excel export error:",
                    err
                );

                alert(
                    "Unable to generate Excel report."
                );

            } finally {

                setExporting(false);
            }
        };


    // =========================================================
    // PDF EXPORT
    // =========================================================

    const exportPDF =
        () => {

            if (
                !filteredBatches.length
            ) {

                alert(
                    "There are no batches to export."
                );

                return;
            }


            try {

                setExporting(true);


                const doc =
                    new jsPDF(
                        "landscape"
                    );


                const today =
                    new Date()
                        .toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            }
                        );


                doc.setFontSize(20);

                doc.text(
                    "EduTrack - Batch Report",
                    14,
                    18
                );


                doc.setFontSize(10);

                doc.text(
                    `Generated On: ${today}`,
                    14,
                    26
                );


                doc.text(
                    `Total Batches: ${filteredBatches.length}`,
                    14,
                    32
                );


                const rows =
                    filteredBatches.map(
                        (batch, index) => [

                            index + 1,

                            nameOf(batch),

                            trainerOf(batch),

                            `₹ ${batch?.fees ?? 0}`,

                            batch?.duration ??
                                "—",

                            dateOf(
                                batch?.startDate
                            ),

                            dateOf(
                                batch?.endDate
                            ),

                            statusOf(batch),

                        ]
                    );


                autoTable(
                    doc,
                    {

                        startY: 40,

                        head: [[

                            "#",

                            "Batch",

                            "Trainer",

                            "Fees",

                            "Duration",

                            "Start Date",

                            "End Date",

                            "Status",

                        ]],

                        body: rows,

                        theme:
                            "striped",

                        styles: {

                            fontSize: 9,

                            cellPadding: 4,

                        },

                        headStyles: {

                            fontSize: 9,

                            fontStyle:
                                "bold",

                        },

                    }
                );


                doc.save(
                    `EduTrack_Batch_Report_${today.replaceAll("/", "-")}.pdf`
                );

            } catch (err) {

                console.error(
                    "PDF export error:",
                    err
                );

                alert(
                    "Unable to generate PDF report."
                );

            } finally {

                setExporting(false);
            }
        };


    // =========================================================
    // CLEAR FILTERS
    // =========================================================

    const clearFilters = () => {

        setSearch("");
        setStatus("");
    };


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="batches-page">

            {/* HEADER */}

            <div className="batches-header">

                <div>

                    <h1>
                        Batches
                    </h1>

                    <p>
                        Manage training batches,
                        schedules and trainers
                    </p>

                </div>


                <button
                    className="add-batch-btn"
                    onClick={() =>
                        navigate(
                            "/batches/add"
                        )
                    }
                >

                    <span>
                        +
                    </span>

                    Add Batch

                </button>

            </div>


            {/* TOOLBAR */}

            <div className="batches-toolbar">

                <div className="batch-search-box">

                    <span>
                        🔍
                    </span>

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search batch or trainer..."
                    />

                </div>


                <select
                    className="batch-filter"
                    value={status}
                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="ACTIVE">
                        Active
                    </option>

                    <option value="UPCOMING">
                        Upcoming
                    </option>

                    <option value="COMPLETED">
                        Completed
                    </option>

                    <option value="CANCELLED">
                        Cancelled
                    </option>

                </select>


                <button
                    className="clear-batch-btn"
                    onClick={
                        clearFilters
                    }
                >
                    Clear
                </button>

            </div>


            {/* EXPORT BAR */}

            <div className="batch-report-toolbar">

                <div>

                    Showing{" "}

                    <strong>
                        {
                            filteredBatches.length
                        }
                    </strong>

                    {" "}of{" "}

                    <strong>
                        {
                            batches.length
                        }
                    </strong>

                    {" "}batches

                </div>


                <div className="batch-export-buttons">

                    <button
                        className="export-excel-btn"
                        onClick={
                            exportExcel
                        }
                        disabled={
                            exporting ||
                            loading
                        }
                    >

                        📊{" "}

                        {
                            exporting
                                ? "Generating..."
                                : "Export Excel"
                        }

                    </button>


                    <button
                        className="export-pdf-btn"
                        onClick={
                            exportPDF
                        }
                        disabled={
                            exporting ||
                            loading
                        }
                    >

                        📄{" "}

                        {
                            exporting
                                ? "Generating..."
                                : "Export PDF"
                        }

                    </button>

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="batch-error">

                    ⚠ {error}

                    <button
                        onClick={
                            loadBatches
                        }
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* TABLE CARD */}

            <div className="batches-card">

                {loading ? (

                    <div className="batch-loading">

                        <div className="loading-spinner" />

                        <p>
                            Loading batches...
                        </p>

                    </div>

                ) : !filteredBatches.length ? (

                    <div className="empty-batches">

                        <div className="empty-batch-icon">
                            📚
                        </div>

                        <h2>
                            {
                                batches.length
                                    ? "No batches found"
                                    : "No batches yet"
                            }
                        </h2>

                        <p>

                            {
                                batches.length
                                    ? "Try changing your search or filters."
                                    : "Start by adding your first batch."
                            }

                        </p>


                        <button
                            className="empty-add-batch"
                            onClick={() =>
                                batches.length
                                    ? clearFilters()
                                    : navigate(
                                        "/batches/add"
                                    )
                            }
                        >

                            {
                                batches.length
                                    ? "Clear Filters"
                                    : "+ Add Batch"
                            }

                        </button>

                    </div>

                ) : (

                    <div className="batch-table-wrapper">

                        <table className="batches-table">

                            <thead>

                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Batch
                                    </th>

                                    <th>
                                        Trainer
                                    </th>

                                    <th>
                                        Fees
                                    </th>

                                    <th>
                                        Duration
                                    </th>

                                    <th>
                                        Start Date
                                    </th>

                                    <th>
                                        End Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredBatches.map(
                                    (batch, index) => {

                                        const id =
                                            idOf(batch);

                                        const name =
                                            nameOf(batch);


                                        return (

                                            <tr
                                                key={
                                                    id ||
                                                    index
                                                }
                                            >

                                                <td>
                                                    {
                                                        index +
                                                        1
                                                    }
                                                </td>


                                                <td>

                                                    <div className="batch-info">

                                                        <div className="batch-avatar">

                                                            {name
                                                                .charAt(
                                                                    0
                                                                )
                                                                .toUpperCase()}

                                                        </div>

                                                        <strong>
                                                            {name}
                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>
                                                    {
                                                        trainerOf(
                                                            batch
                                                        )
                                                    }
                                                </td>


                                                <td>

                                                    ₹{" "}

                                                    {
                                                        batch?.fees ??
                                                        0
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        batch?.duration ??
                                                        "—"
                                                    }{" "}

                                                    {
                                                        batch?.duration
                                                            ? "Days"
                                                            : ""
                                                    }

                                                </td>


                                                <td>
                                                    {
                                                        dateOf(
                                                            batch?.startDate
                                                        )
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        dateOf(
                                                            batch?.endDate
                                                        )
                                                    }
                                                </td>


                                                <td>

                                                    <span
                                                        className={`batch-status ${statusOf(
                                                            batch
                                                        ).toLowerCase()}`}
                                                    >
                                                        {
                                                            statusOf(
                                                                batch
                                                            )
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="batch-actions">

                                                        <button
                                                            className="view-btn"
                                                            title="View"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/batches/${id}`
                                                                )
                                                            }
                                                        >
                                                            👁
                                                        </button>


                                                        <button
                                                            className="edit-btn"
                                                            title="Edit"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/batches/edit/${id}`
                                                                )
                                                            }
                                                        >
                                                            ✏
                                                        </button>


                                                        <button
                                                            className="delete-btn"
                                                            title="Delete"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    batch
                                                                )
                                                            }
                                                        >
                                                            🗑
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );
                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}