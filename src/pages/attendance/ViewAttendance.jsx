import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getAttendanceById,
    extractAttendanceId,
} from "../../api/attendanceApi";

export default function ViewAttendance() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [attendance, setAttendance] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // =====================================================
    // LOAD ATTENDANCE
    // =====================================================

    useEffect(() => {

        const loadAttendance = async () => {

            if (!id) {

                setError(
                    "Attendance ID is missing."
                );

                setLoading(false);

                return;
            }

            try {

                setLoading(true);

                setError("");

                console.log(
                    "Loading attendance:",
                    id
                );

                const response =
                    await getAttendanceById(id);

                console.log(
                    "Attendance response:",
                    response
                );

                const data =
                    response?.data;

                if (!data) {

                    throw new Error(
                        "Attendance record not found."
                    );
                }

                setAttendance(data);

            } catch (err) {

                console.error(
                    "Error loading attendance:",
                    err
                );

                const message =
                    typeof err.response?.data ===
                    "string"
                        ? err.response.data
                        : err.response?.data?.message ||
                          err.message ||
                          "Unable to load attendance.";

                setError(message);

            } finally {

                setLoading(false);
            }
        };

        loadAttendance();

    }, [id]);

    // =====================================================
    // STATUS BADGE
    // =====================================================

    const getStatusClass = (status) => {

        const value =
            String(status || "")
                .toLowerCase();

        if (value === "present") {
            return "bg-success-subtle text-success";
        }

        if (value === "absent") {
            return "bg-danger-subtle text-danger";
        }

        if (value === "late") {
            return "bg-warning-subtle text-warning";
        }

        return "bg-secondary-subtle text-secondary";
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="container-fluid py-4">

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        minHeight: "400px",
                    }}
                >

                    <div className="text-center">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="mt-3 text-muted">
                            Loading attendance...
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (
            <div className="container-fluid py-4">

                <div className="alert alert-danger">
                    {error}
                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/attendance")
                    }
                >
                    ← Back to Attendance
                </button>

            </div>
        );
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div className="container-fluid py-4">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="fw-bold mb-1">
                        Attendance Details
                    </h1>

                    <p className="text-muted mb-0">
                        View complete attendance information
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                            navigate("/attendance")
                        }
                    >
                        ← Back
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            navigate(
                                `/attendance/edit/${extractAttendanceId(
                                    attendance
                                )}`
                            )
                        }
                    >
                        ✏️ Edit Attendance
                    </button>

                </div>

            </div>

            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    {/* =================================================
                        TOP SUMMARY
                    ================================================= */}

                    <div className="row g-4 mb-4">

                        <div className="col-md-4">

                            <div className="p-4 rounded-3 bg-light h-100">

                                <div className="text-muted small mb-2">
                                    Student
                                </div>

                                <div className="fs-4 fw-semibold">
                                    {attendance?.studentName ||
                                        attendance?.student?.name ||
                                        "-"}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="p-4 rounded-3 bg-light h-100">

                                <div className="text-muted small mb-2">
                                    Batch
                                </div>

                                <div className="fs-4 fw-semibold">
                                    {attendance?.batchName ||
                                        attendance?.batch?.name ||
                                        "-"}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="p-4 rounded-3 bg-light h-100">

                                <div className="text-muted small mb-2">
                                    Attendance Status
                                </div>

                                <span
                                    className={`badge rounded-pill fs-6 px-3 py-2 ${getStatusClass(
                                        attendance?.status
                                    )}`}
                                >
                                    {attendance?.status ||
                                        "-"}
                                </span>

                            </div>

                        </div>

                    </div>

                    <hr />

                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <h5 className="fw-bold mb-4">
                        Attendance Information
                    </h5>

                    <div className="row g-4">

                        <div className="col-md-6">

                            <div className="border rounded-3 p-3">

                                <div className="text-muted small">
                                    Student Name
                                </div>

                                <div className="fw-semibold mt-1">
                                    {attendance?.studentName ||
                                        attendance?.student?.name ||
                                        "-"}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="border rounded-3 p-3">

                                <div className="text-muted small">
                                    Batch Name
                                </div>

                                <div className="fw-semibold mt-1">
                                    {attendance?.batchName ||
                                        attendance?.batch?.name ||
                                        "-"}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="border rounded-3 p-3">

                                <div className="text-muted small">
                                    Attendance Date
                                </div>

                                <div className="fw-semibold mt-1">
                                    {attendance?.date ||
                                        "-"}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="border rounded-3 p-3">

                                <div className="text-muted small">
                                    Status
                                </div>

                                <div className="mt-1">

                                    <span
                                        className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                                            attendance?.status
                                        )}`}
                                    >
                                        {attendance?.status ||
                                            "-"}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="col-12">

                            <div className="border rounded-3 p-3">

                                <div className="text-muted small">
                                    Attendance ID
                                </div>

                                <div className="fw-semibold mt-1 text-break">
                                    {extractAttendanceId(
                                        attendance
                                    ) || "-"}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}