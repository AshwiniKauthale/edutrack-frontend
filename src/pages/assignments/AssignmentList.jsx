
import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getAssignments,
    deleteAssignment,
    extractAssignmentId
} from "../../api/assignmentApi";

// =====================================================
// PDF EXPORT
// =====================================================

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// =====================================================
// EXCEL EXPORT
// =====================================================

import * as XLSX from "xlsx";


const AssignmentList = () => {

    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [assignments, setAssignments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");


    // =====================================================
    // LOAD ASSIGNMENTS
    // =====================================================

    const loadAssignments = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getAssignments();

            console.log(
                "ASSIGNMENT API RESPONSE:",
                response
            );

            let data = [];

            if (Array.isArray(response)) {

                data = response;

            } else if (
                response &&
                Array.isArray(response.data)
            ) {

                data = response.data;

            } else if (
                response &&
                Array.isArray(response.content)
            ) {

                data = response.content;

            }

            setAssignments(data);

        } catch (err) {

            console.error(
                "Error loading assignments:",
                err
            );

            if (err.response?.status === 403) {

                setError(
                    "You are not authorized to view assignments."
                );

            } else if (err.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else {

                setError(
                    typeof err.response?.data === "string"
                        ? err.response.data
                        : "Unable to load assignments."
                );
            }

            setAssignments([]);

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadAssignments();

    }, []);


    // =====================================================
    // ASSIGNMENT STATISTICS
    // =====================================================

    const assignmentStats = useMemo(() => {

        const total = assignments.length;

        const active = assignments.filter(
            (assignment) =>
                String(
                    assignment.status || "ACTIVE"
                ).toUpperCase() === "ACTIVE"
        ).length;

        const pending = assignments.filter(
            (assignment) =>
                String(
                    assignment.status || ""
                ).toUpperCase() === "PENDING"
        ).length;

        const completed = assignments.filter(
            (assignment) =>
                String(
                    assignment.status || ""
                ).toUpperCase() === "COMPLETED"
        ).length;

        const expired = assignments.filter(
            (assignment) =>
                String(
                    assignment.status || ""
                ).toUpperCase() === "EXPIRED"
        ).length;

        return {
            total,
            active,
            pending,
            completed,
            expired
        };

    }, [assignments]);


    // =====================================================
    // FILTER ASSIGNMENTS
    // =====================================================

    const filteredAssignments = useMemo(() => {

        const searchText =
            search
                .trim()
                .toLowerCase();

        return assignments.filter(
            (assignment) => {

                const title =
                    String(
                        assignment.title || ""
                    ).toLowerCase();

                const subject =
                    String(
                        assignment.subject || ""
                    ).toLowerCase();

                const teacher =
                    String(
                        assignment.teacher || ""
                    ).toLowerCase();

                const batch =
                    String(
                        assignment.batch || ""
                    ).toLowerCase();

                const classroom =
                    String(
                        assignment.classroom || ""
                    ).toLowerCase();

                const status =
                    String(
                        assignment.status || "ACTIVE"
                    ).toUpperCase();

                const matchesSearch =
                    !searchText ||
                    title.includes(searchText) ||
                    subject.includes(searchText) ||
                    teacher.includes(searchText) ||
                    batch.includes(searchText) ||
                    classroom.includes(searchText);

                const matchesStatus =
                    statusFilter === "ALL" ||
                    status === statusFilter;

                return (
                    matchesSearch &&
                    matchesStatus
                );
            }
        );

    }, [
        assignments,
        search,
        statusFilter
    ]);


    // =====================================================
    // DELETE ASSIGNMENT
    // =====================================================

    const handleDelete = async (assignment) => {

        const id =
            extractAssignmentId(
                assignment
            );

        if (!id) {

            alert(
                "Assignment ID not found."
            );

            return;
        }

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${assignment.title || "this assignment"}"?`
            );

        if (!confirmed) {

            return;
        }

        try {

            await deleteAssignment(id);

            alert(
                "Assignment deleted successfully."
            );

            await loadAssignments();

        } catch (err) {

            console.error(
                "Delete assignment error:",
                err
            );

            alert(
                typeof err.response?.data === "string"
                    ? err.response.data
                    : "Failed to delete assignment."
            );
        }
    };


    // =====================================================
    // STATUS BADGE
    // =====================================================

    const getStatusBadge = (status) => {

        const normalized =
            String(
                status || "ACTIVE"
            ).toUpperCase();

        if (normalized === "COMPLETED") {

            return "bg-success";
        }

        if (normalized === "EXPIRED") {

            return "bg-danger";
        }

        if (normalized === "PENDING") {

            return "bg-warning text-dark";
        }

        return "bg-primary";
    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        try {

            const parsedDate =
                new Date(date);

            if (Number.isNaN(parsedDate.getTime())) {

                return date;
            }

            return parsedDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        } catch {

            return date;
        }
    };


    // =====================================================
    // PDF EXPORT
    // =====================================================

    const downloadPDF = () => {

        if (
            !filteredAssignments ||
            filteredAssignments.length === 0
        ) {

            alert(
                "No assignments available to export."
            );

            return;
        }

        try {

            const doc =
                new jsPDF(
                    "landscape"
                );

            // =================================================
            // TITLE
            // =================================================

            doc.setFontSize(18);

            doc.text(
                "EduTrack - Assignment Report",
                14,
                15
            );

            // =================================================
            // SUBTITLE
            // =================================================

            doc.setFontSize(10);

            doc.text(
                `Generated on: ${new Date().toLocaleString()}`,
                14,
                22
            );

            doc.text(
                `Total Assignments: ${filteredAssignments.length}`,
                14,
                28
            );

            // =================================================
            // TABLE DATA
            // =================================================

            const tableRows =
                filteredAssignments.map(
                    (assignment, index) => [

                        index + 1,

                        assignment.title ||
                        "-",

                        assignment.subject ||
                        "-",

                        assignment.teacher ||
                        "-",

                        assignment.batch ||
                        "-",

                        assignment.classroom ||
                        "-",

                        formatDate(
                            assignment.dueDate
                        ),

                        assignment.maxMarks ??
                        0,

                        assignment.status ||
                        "ACTIVE"
                    ]
                );

            // =================================================
            // CREATE TABLE
            // =================================================

            autoTable(
                doc,
                {
                    startY: 34,

                    head: [[

                        "#",
                        "Assignment",
                        "Subject",
                        "Teacher",
                        "Batch",
                        "Classroom",
                        "Due Date",
                        "Marks",
                        "Status"

                    ]],

                    body: tableRows,

                    theme: "grid",

                    styles: {

                        fontSize: 8,

                        cellPadding: 3,

                        valign: "middle"

                    },

                    headStyles: {

                        fontSize: 8,

                        fontStyle: "bold"

                    },

                    columnStyles: {

                        0: {
                            cellWidth: 10
                        },

                        1: {
                            cellWidth: 40
                        },

                        2: {
                            cellWidth: 28
                        },

                        3: {
                            cellWidth: 30
                        },

                        4: {
                            cellWidth: 30
                        },

                        5: {
                            cellWidth: 35
                        },

                        6: {
                            cellWidth: 25
                        },

                        7: {
                            cellWidth: 15
                        },

                        8: {
                            cellWidth: 25
                        }

                    }

                }
            );

            // =================================================
            // FOOTER
            // =================================================

            const pageCount =
                doc.internal.getNumberOfPages();

            for (
                let i = 1;
                i <= pageCount;
                i++
            ) {

                doc.setPage(i);

                doc.setFontSize(8);

                doc.text(
                    `Page ${i} of ${pageCount}`,
                    270,
                    200,
                    {
                        align: "right"
                    }
                );
            }

            // =================================================
            // DOWNLOAD
            // =================================================

            doc.save(
                "EduTrack_Assignment_Report.pdf"
            );

        } catch (err) {

            console.error(
                "PDF export error:",
                err
            );

            alert(
                "Failed to generate PDF."
            );
        }
    };


    // =====================================================
    // EXCEL EXPORT
    // =====================================================

    const downloadExcel = () => {

        if (
            !filteredAssignments ||
            filteredAssignments.length === 0
        ) {

            alert(
                "No assignments available to export."
            );

            return;
        }

        try {

            // =================================================
            // PREPARE EXCEL DATA
            // =================================================

            const excelData =
                filteredAssignments.map(
                    (assignment, index) => ({

                        "#":
                            index + 1,

                        "Assignment":
                            assignment.title ||
                            "-",

                        "Description":
                            assignment.description ||
                            "-",

                        "Subject":
                            assignment.subject ||
                            "-",

                        "Teacher":
                            assignment.teacher ||
                            "-",

                        "Batch":
                            assignment.batch ||
                            "-",

                        "Classroom":
                            assignment.classroom ||
                            "-",

                        "Assigned Date":
                            formatDate(
                                assignment.assignedDate
                            ),

                        "Due Date":
                            formatDate(
                                assignment.dueDate
                            ),

                        "Maximum Marks":
                            assignment.maxMarks ??
                            0,

                        "Status":
                            assignment.status ||
                            "ACTIVE"

                    })
                );

            // =================================================
            // CREATE WORKSHEET
            // =================================================

            const worksheet =
                XLSX.utils.json_to_sheet(
                    excelData
                );

            // =================================================
            // COLUMN WIDTH
            // =================================================

            worksheet["!cols"] = [

                {
                    wch: 6
                },

                {
                    wch: 30
                },

                {
                    wch: 45
                },

                {
                    wch: 20
                },

                {
                    wch: 25
                },

                {
                    wch: 25
                },

                {
                    wch: 25
                },

                {
                    wch: 18
                },

                {
                    wch: 18
                },

                {
                    wch: 16
                },

                {
                    wch: 16
                }

            ];

            // =================================================
            // CREATE WORKBOOK
            // =================================================

            const workbook =
                XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Assignments"
            );

            // =================================================
            // DOWNLOAD
            // =================================================

            XLSX.writeFile(
                workbook,
                "EduTrack_Assignment_Report.xlsx"
            );

        } catch (err) {

            console.error(
                "Excel export error:",
                err
            );

            alert(
                "Failed to generate Excel file."
            );
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="container-fluid py-4">

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="mt-3 mb-0">
                            Loading assignments...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="container-fluid py-4">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3 className="fw-bold mb-1">
                        Assignment Management
                    </h3>

                    <p className="text-muted mb-0">
                        Manage assignments and academic tasks
                    </p>

                </div>


                <div className="d-flex gap-2 flex-wrap">

                    {/* PDF */}

                    <button
                        className="btn btn-outline-danger"
                        onClick={downloadPDF}
                        title="Download PDF"
                    >

                        <i className="bi bi-file-earmark-pdf me-2"></i>

                        PDF

                    </button>


                    {/* EXCEL */}

                    <button
                        className="btn btn-outline-success"
                        onClick={downloadExcel}
                        title="Download Excel"
                    >

                        <i className="bi bi-file-earmark-excel me-2"></i>

                        Excel

                    </button>


                    {/* ADD */}

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate(
                                "/assignments/add"
                            )
                        }
                    >

                        <i className="bi bi-plus-lg me-2"></i>

                        Add Assignment

                    </button>

                </div>

            </div>


            {/* ================================================= */}
            {/* STATISTICS */}
            {/* ================================================= */}

            <div className="row g-3 mb-4">

                {/* TOTAL */}

                <div className="col-md-6 col-lg">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Total Assignments
                                    </small>

                                    <h3 className="fw-bold mb-0 mt-1">
                                        {
                                            assignmentStats.total
                                        }
                                    </h3>

                                </div>

                                <div
                                    className="bg-primary bg-opacity-10 rounded-circle p-3"
                                >

                                    <i className="bi bi-journal-text text-primary fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ACTIVE */}

                <div className="col-md-6 col-lg">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Active
                                    </small>

                                    <h3 className="fw-bold text-primary mb-0 mt-1">
                                        {
                                            assignmentStats.active
                                        }
                                    </h3>

                                </div>

                                <div
                                    className="bg-primary bg-opacity-10 rounded-circle p-3"
                                >

                                    <i className="bi bi-play-circle text-primary fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* PENDING */}

                <div className="col-md-6 col-lg">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Pending
                                    </small>

                                    <h3 className="fw-bold text-warning mb-0 mt-1">
                                        {
                                            assignmentStats.pending
                                        }
                                    </h3>

                                </div>

                                <div
                                    className="bg-warning bg-opacity-10 rounded-circle p-3"
                                >

                                    <i className="bi bi-clock text-warning fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* COMPLETED */}

                <div className="col-md-6 col-lg">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Completed
                                    </small>

                                    <h3 className="fw-bold text-success mb-0 mt-1">
                                        {
                                            assignmentStats.completed
                                        }
                                    </h3>

                                </div>

                                <div
                                    className="bg-success bg-opacity-10 rounded-circle p-3"
                                >

                                    <i className="bi bi-check-circle text-success fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* EXPIRED */}

                <div className="col-md-6 col-lg">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Expired
                                    </small>

                                    <h3 className="fw-bold text-danger mb-0 mt-1">
                                        {
                                            assignmentStats.expired
                                        }
                                    </h3>

                                </div>

                                <div
                                    className="bg-danger bg-opacity-10 rounded-circle p-3"
                                >

                                    <i className="bi bi-x-circle text-danger fs-4"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

                <div
                    className="alert alert-danger d-flex justify-content-between align-items-center"
                    role="alert"
                >

                    <span>
                        {error}
                    </span>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={loadAssignments}
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* ================================================= */}
            {/* FILTER CARD */}
            {/* ================================================= */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-3">

                        {/* SEARCH */}

                        <div className="col-md-8">

                            <label className="form-label fw-semibold">

                                Search Assignment

                            </label>

                            <div className="input-group">

                                <span className="input-group-text">
                                    🔍
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by title, subject, teacher, batch or classroom..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* STATUS */}

                        <div className="col-md-4">

                            <label className="form-label fw-semibold">

                                Status

                            </label>

                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="ALL">
                                    All Status
                                </option>

                                <option value="ACTIVE">
                                    Active
                                </option>

                                <option value="PENDING">
                                    Pending
                                </option>

                                <option value="COMPLETED">
                                    Completed
                                </option>

                                <option value="EXPIRED">
                                    Expired
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>

                                    <th className="px-3">
                                        #
                                    </th>

                                    <th>
                                        Assignment
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Teacher
                                    </th>

                                    <th>
                                        Batch
                                    </th>

                                    <th>
                                        Due Date
                                    </th>

                                    <th>
                                        Marks
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th className="text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredAssignments.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center py-5"
                                        >

                                            <div className="text-muted">

                                                <div
                                                    style={{
                                                        fontSize:
                                                            "40px"
                                                    }}
                                                >
                                                    📚
                                                </div>

                                                <p className="mb-1 fw-semibold">
                                                    No assignments found
                                                </p>

                                                <small>
                                                    Try changing your search or status filter.
                                                </small>

                                            </div>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredAssignments.map(
                                        (
                                            assignment,
                                            index
                                        ) => {

                                            const id =
                                                extractAssignmentId(
                                                    assignment
                                                );

                                            return (

                                                <tr
                                                    key={
                                                        id ||
                                                        index
                                                    }
                                                >

                                                    {/* NUMBER */}

                                                    <td className="px-3">

                                                        {
                                                            index + 1
                                                        }

                                                    </td>


                                                    {/* ASSIGNMENT */}

                                                    <td>

                                                        <div className="fw-semibold">

                                                            {
                                                                assignment.title ||
                                                                "Untitled"
                                                            }

                                                        </div>

                                                        <small className="text-muted">

                                                            {
                                                                assignment.description

                                                                    ? assignment.description.length >
                                                                      60

                                                                        ? assignment.description.substring(
                                                                            0,
                                                                            60
                                                                        ) +
                                                                          "..."

                                                                        : assignment.description

                                                                    : "No description"
                                                            }

                                                        </small>

                                                    </td>


                                                    {/* SUBJECT */}

                                                    <td>

                                                        {
                                                            assignment.subject ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* TEACHER */}

                                                    <td>

                                                        {
                                                            assignment.teacher ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* BATCH */}

                                                    <td>

                                                        {
                                                            assignment.batch ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* DUE DATE */}

                                                    <td>

                                                        {
                                                            formatDate(
                                                                assignment.dueDate
                                                            )
                                                        }

                                                    </td>


                                                    {/* MARKS */}

                                                    <td>

                                                        <span className="fw-semibold">

                                                            {
                                                                assignment.maxMarks ??
                                                                0
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        <span
                                                            className={`badge ${getStatusBadge(
                                                                assignment.status
                                                            )}`}
                                                        >

                                                            {
                                                                assignment.status ||
                                                                "ACTIVE"
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td>

                                                        <div className="d-flex justify-content-center gap-1">

                                                            {/* VIEW */}

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-info"
                                                                title="View Assignment"
                                                                disabled={!id}
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/assignments/${id}`
                                                                    )
                                                                }
                                                            >

                                                                <i className="bi bi-eye"></i>

                                                            </button>


                                                            {/* EDIT */}

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-primary"
                                                                title="Edit Assignment"
                                                                disabled={!id}
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/assignments/edit/${id}`
                                                                    )
                                                                }
                                                            >

                                                                <i className="bi bi-pencil"></i>

                                                            </button>


                                                            {/* DELETE */}

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger"
                                                                title="Delete Assignment"
                                                                disabled={!id}
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        assignment
                                                                    )
                                                                }
                                                            >

                                                                <i className="bi bi-trash"></i>

                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* ================================================= */}
                {/* FOOTER */}
                {/* ================================================= */}

                <div className="card-footer bg-white">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                        <small className="text-muted">

                            Showing{" "}

                            <strong>
                                {
                                    filteredAssignments.length
                                }
                            </strong>{" "}

                            of{" "}

                            <strong>
                                {
                                    assignments.length
                                }
                            </strong>{" "}

                            assignments

                        </small>


                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={
                                loadAssignments
                            }
                            disabled={loading}
                        >

                            <i className="bi bi-arrow-clockwise me-1"></i>

                            Refresh

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default AssignmentList;

