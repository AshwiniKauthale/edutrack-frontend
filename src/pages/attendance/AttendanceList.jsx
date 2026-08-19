import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAttendance,
    deleteAttendance,
    extractAttendanceId
} from "../../api/attendanceApi";

import "./AttendanceList.css";

const AttendanceList = () => {

    const navigate = useNavigate();

    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD ATTENDANCE
    // =====================================================

    const loadAttendance = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAttendance();

            console.log("Attendance response:", response);

            let attendanceData = [];

            if (Array.isArray(response.data)) {
                attendanceData = response.data;
            } else if (Array.isArray(response.data?.content)) {
                attendanceData = response.data.content;
            } else if (Array.isArray(response.data?.data)) {
                attendanceData = response.data.data;
            } else if (response.data) {
                attendanceData = [];
            }

            setAttendance(attendanceData);

        } catch (error) {
            console.error("Error loading attendance:", error);

            let errorMessage = "Failed to load attendance.";

            if (error.response) {
                const data = error.response.data;

                if (typeof data === "string") {
                    errorMessage = data;
                } else if (data?.message) {
                    errorMessage = data.message;
                } else if (data?.error) {
                    errorMessage = data.error;
                } else if (error.response.status === 404) {
                    errorMessage =
                        "Attendance API endpoint was not found. Please check the backend AttendanceController URL.";
                } else if (error.response.status === 403) {
                    errorMessage =
                        "You are not authorized to access attendance.";
                } else if (error.response.status === 401) {
                    errorMessage =
                        "Your session has expired. Please login again.";
                }
            } else if (error.request) {
                errorMessage =
                    "Backend server is not responding.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            setError(errorMessage);
            setAttendance([]);

        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadAttendance();

    }, []);

    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    useEffect(() => {

        let result = [...attendance];

        // Search
        if (search.trim() !== "") {

            const searchValue =
                search.toLowerCase();

            result = result.filter(item => {

                const student =
                    item.studentName || "";

                const batch =
                    item.batchName || "";

                const date =
                    item.date || "";

                return (
                    student
                        .toLowerCase()
                        .includes(searchValue) ||

                    batch
                        .toLowerCase()
                        .includes(searchValue) ||

                    date
                        .toLowerCase()
                        .includes(searchValue)
                );
            });
        }

        // Status filter
        if (statusFilter !== "ALL") {

            result = result.filter(item => {

                return (
                    (item.status || "")
                        .toUpperCase() ===
                    statusFilter
                );
            });
        }

        setFilteredAttendance(result);

    }, [
        search,
        statusFilter,
        attendance
    ]);

    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (item) => {

        const id =
            extractAttendanceId(item);

        if (!id) {

            alert(
                "Attendance ID not found"
            );

            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this attendance record?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteAttendance(id);

            setAttendance(prev =>
                prev.filter(item =>
                    extractAttendanceId(item) !== id
                )
            );

            alert(
                "Attendance deleted successfully"
            );

        } catch (error) {

            console.error(
                "Error deleting attendance:",
                error
            );

            alert(
                error.response?.data ||
                "Failed to delete attendance"
            );
        }
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        try {

            return new Date(
                `${date}T00:00:00`
            ).toLocaleDateString(
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
    // STATUS BADGE
    // =====================================================

    const getStatusBadge = (status) => {

        const normalized =
            (status || "")
                .toUpperCase();

        if (normalized === "PRESENT") {

            return (
                <span className="badge bg-success">
                    Present
                </span>
            );
        }

        if (normalized === "ABSENT") {

            return (
                <span className="badge bg-danger">
                    Absent
                </span>
            );
        }

        return (
            <span className="badge bg-secondary">
                {status || "Unknown"}
            </span>
        );
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="container-fluid p-4">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="mt-3 text-muted">
                        Loading attendance...
                    </p>

                </div>

            </div>
        );
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="container-fluid p-4">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Attendance
                    </h2>

                    <p className="text-muted mb-0">
                        Manage student attendance records
                    </p>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/attendance/mark")
                    }
                >
                    <i className="bi bi-plus-lg me-2"></i>

                    Mark Attendance
                </button>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    {error}
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
                                Search
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by student, batch or date..."
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

                                <option value="PRESENT">
                                    Present
                                </option>

                                <option value="ABSENT">
                                    Absent
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* STATISTICS */}
            {/* ================================================= */}

            <div className="row g-3 mb-4">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <div className="text-muted small">
                                Total Records
                            </div>

                            <h3 className="fw-bold mb-0">
                                {attendance.length}
                            </h3>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <div className="text-muted small">
                                Present
                            </div>

                            <h3 className="fw-bold text-success mb-0">

                                {
                                    attendance.filter(
                                        item =>
                                            (
                                                item.status ||
                                                ""
                                            ).toUpperCase() ===
                                            "PRESENT"
                                    ).length
                                }

                            </h3>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <div className="text-muted small">
                                Absent
                            </div>

                            <h3 className="fw-bold text-danger mb-0">

                                {
                                    attendance.filter(
                                        item =>
                                            (
                                                item.status ||
                                                ""
                                            ).toUpperCase() ===
                                            "ABSENT"
                                    ).length
                                }

                            </h3>

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

                                    <th className="px-4">
                                        #
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Batch
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Remarks
                                    </th>

                                    <th className="text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredAttendance.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-5"
                                        >

                                            <div className="text-muted">

                                                <i
                                                    className="bi bi-calendar-x"
                                                    style={{
                                                        fontSize:
                                                            "2.5rem"
                                                    }}
                                                ></i>

                                                <p className="mt-2 mb-0">
                                                    No attendance records found
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredAttendance.map(
                                        (item, index) => {

                                            const id =
                                                extractAttendanceId(
                                                    item
                                                );

                                            return (

                                                <tr key={id || index}>

                                                    <td className="px-4">
                                                        {index + 1}
                                                    </td>

                                                    <td>

                                                        <div className="fw-semibold">
                                                            {
                                                                item.studentName ||
                                                                "-"
                                                            }
                                                        </div>

                                                    </td>

                                                    <td>
                                                        {
                                                            item.batchName ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            formatDate(
                                                                item.date
                                                            )
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            getStatusBadge(
                                                                item.status
                                                            )
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            item.remarks ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>

                                                        <div className="d-flex justify-content-center gap-2">

                                                            {/* EDIT */}

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-primary"
                                                                title="Edit"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/attendance/edit/${id}`
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-pencil"></i>
                                                            </button>


                                                            {/* DELETE */}

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger"
                                                                title="Delete"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item
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

            </div>

        </div>
    );
};

export default AttendanceList;