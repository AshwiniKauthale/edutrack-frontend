import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClassroomById } from "../../api/classroomApi";

const ViewClassroom = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [classroom, setClassroom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD CLASSROOM
    // =====================================================

    useEffect(() => {
        const loadClassroom = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getClassroomById(id);

                console.log("CLASSROOM DETAILS:", response);

                // Handle different API response structures
                const data = response?.data || response;

                setClassroom(data);

            } catch (err) {
                console.error("Error loading classroom:", err);

                setError(
                    err?.response?.data?.message ||
                    err?.response?.data ||
                    "Unable to load classroom details."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadClassroom();
        }
    }, [id]);

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="container-fluid px-4 py-4">
                <div className="d-flex justify-content-center align-items-center py-5">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <span className="ms-3 text-muted">
                        Loading classroom details...
                    </span>
                </div>
            </div>
        );
    }

    // =====================================================
    // ERROR
    // =====================================================

    if (error) {
        return (
            <div className="container-fluid px-4 py-4">

                <div className="alert alert-danger shadow-sm">
                    <h5 className="mb-2">
                        Unable to Load Classroom
                    </h5>

                    <p className="mb-3">
                        {error}
                    </p>

                    <button
                        className="btn btn-outline-danger"
                        onClick={() => navigate("/classrooms")}
                    >
                        ← Back to Classrooms
                    </button>
                </div>

            </div>
        );
    }

    // =====================================================
    // CLASSROOM NOT FOUND
    // =====================================================

    if (!classroom) {
        return (
            <div className="container-fluid px-4 py-4">

                <div className="alert alert-warning shadow-sm">
                    <h5>Classroom Not Found</h5>

                    <p className="mb-3">
                        The requested classroom could not be found.
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/classrooms")}
                    >
                        ← Back to Classrooms
                    </button>
                </div>

            </div>
        );
    }

    // =====================================================
    // HELPER
    // =====================================================

    const displayValue = (value) => {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "Not specified";
        }

        return value;
    };

    // =====================================================
    // STATUS BADGE
    // =====================================================

    const getStatusBadge = (status) => {

        if (!status) {
            return (
                <span className="badge bg-secondary">
                    Not specified
                </span>
            );
        }

        const normalizedStatus =
            String(status).toLowerCase();

        if (
            normalizedStatus === "available" ||
            normalizedStatus === "active"
        ) {
            return (
                <span className="badge bg-success-subtle text-success px-3 py-2">
                    ✓ {status}
                </span>
            );
        }

        if (
            normalizedStatus === "unavailable" ||
            normalizedStatus === "inactive"
        ) {
            return (
                <span className="badge bg-danger-subtle text-danger px-3 py-2">
                    ○ {status}
                </span>
            );
        }

        return (
            <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2">
                {status}
            </span>
        );
    };

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div className="container-fluid px-4 py-4">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="d-flex justify-content-between align-items-start mb-4">

                <div>
                    <h1 className="fw-bold mb-1">
                        Classroom Details
                    </h1>

                    <p className="text-muted mb-0">
                        View classroom information
                    </p>
                </div>

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/classrooms")}
                    >
                        ← Back
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate(`/classrooms/edit/${classroom.id}`)
                        }
                    >
                        ✎ Edit Classroom
                    </button>

                </div>

            </div>

            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-lg-5">

                    {/* =================================================
                        BASIC INFORMATION
                    ================================================= */}

                    <div className="mb-4">

                        <h5 className="fw-bold mb-1">
                            🏫 Basic Information
                        </h5>

                        <p className="text-muted small mb-0">
                            General classroom information
                        </p>

                    </div>

                    <div className="row g-4 mb-5">

                        {/* CLASSROOM NAME */}

                        <div className="col-md-6">

                            <div className="detail-box">

                                <div className="detail-label">
                                    Classroom Name
                                </div>

                                <div className="detail-value">
                                    {displayValue(classroom.name)}
                                </div>

                            </div>

                        </div>

                        {/* ROOM NUMBER */}

                        <div className="col-md-6">

                            <div className="detail-box">

                                <div className="detail-label">
                                    Room Number
                                </div>

                                <div className="detail-value">
                                    {displayValue(
                                        classroom.roomNumber
                                    )}
                                </div>

                            </div>

                        </div>

                        {/* BUILDING */}

                        <div className="col-md-4">

                            <div className="detail-box">

                                <div className="detail-label">
                                    Building
                                </div>

                                <div className="detail-value">
                                    {displayValue(
                                        classroom.building
                                    )}
                                </div>

                            </div>

                        </div>

                        {/* FLOOR */}

                        <div className="col-md-4">

                            <div className="detail-box">

                                <div className="detail-label">
                                    Floor
                                </div>

                                <div className="detail-value">
                                    {displayValue(
                                        classroom.floor
                                    )}
                                </div>

                            </div>

                        </div>

                        {/* CAPACITY */}

                        <div className="col-md-4">

                            <div className="detail-box">

                                <div className="detail-label">
                                    Capacity
                                </div>

                                <div className="detail-value">
                                    {displayValue(
                                        classroom.capacity
                                    )}
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        CLASSROOM DETAILS
                    ================================================= */}

                    <div className="mb-4">

                        <h5 className="fw-bold mb-1">
                            📋 Classroom Details
                        </h5>

                        <p className="text-muted small mb-0">
                            Type, status and available facilities
                        </p>

                    </div>

                    <div className="row g-4 mb-5">

                        {/* ROOM TYPE */}

                        <div className="col-md-6">

                            <div className="detail-box">

                                <div className="detail-label">
                                    Room Type
                                </div>

                                <div className="detail-value">
                                    {displayValue(
                                        classroom.roomType
                                    )}
                                </div>

                            </div>

                        </div>

                        {/* STATUS */}

                        <div className="col-md-6">

                            <div className="detail-box">

                                <div className="detail-label">
                                    Status
                                </div>

                                <div className="mt-2">
                                    {getStatusBadge(
                                        classroom.status
                                    )}
                                </div>

                            </div>

                        </div>

                        {/* FACILITIES */}

                        <div className="col-12">

                            <div className="detail-box">

                                <div className="detail-label">
                                    Facilities
                                </div>

                                <div className="detail-value">

                                    {displayValue(
                                        classroom.facilities
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <div className="mb-3">

                        <h5 className="fw-bold mb-1">
                            📝 Description
                        </h5>

                        <p className="text-muted small mb-0">
                            Additional information about the classroom
                        </p>

                    </div>

                    <div className="description-box">

                        {classroom.description
                            ? classroom.description
                            : "No description provided."}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ViewClassroom;


/* =========================================================
   INLINE STYLES
========================================================= */

const style = document.createElement("style");

style.innerHTML = `

    .detail-box {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 18px 20px;
        height: 100%;
        transition: all 0.2s ease;
    }

    .detail-box:hover {
        border-color: #d6dbe1;
        box-shadow: 0 3px 10px rgba(0,0,0,0.04);
    }

    .detail-label {
        color: #6c757d;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .detail-value {
        color: #212529;
        font-size: 16px;
        font-weight: 600;
        word-break: break-word;
    }

    .description-box {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 20px;
        min-height: 100px;
        color: #495057;
        line-height: 1.7;
        white-space: pre-wrap;
    }

`;

document.head.appendChild(style);