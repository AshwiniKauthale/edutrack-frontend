import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getAssignmentById,
    extractAssignmentId
} from "../../api/assignmentApi";

const ViewAssignment = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    const [assignment, setAssignment] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =====================================================
    // LOAD ASSIGNMENT
    // =====================================================

    const loadAssignment = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getAssignmentById(id);

            console.log(
                "ASSIGNMENT DETAILS:",
                response
            );

            setAssignment(response);

        } catch (err) {

            console.error(
                "Error loading assignment:",
                err
            );

            setError(
                err.response?.data ||
                "Unable to load assignment."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        if (id) {
            loadAssignment();
        }

    }, [id]);


    // =====================================================
    // STATUS
    // =====================================================

    const getStatusBadge = (status) => {

        const normalized =
            String(status || "")
                .toUpperCase();

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
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="container-fluid py-4">

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <div
                            className="spinner-border text-primary"
                        />

                        <p className="mt-3 mb-0">
                            Loading assignment...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error || !assignment) {

        return (

            <div className="container-fluid py-4">

                <div className="alert alert-danger">
                    {error ||
                        "Assignment not found."}
                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/assignments")
                    }
                >
                    ← Back to Assignments
                </button>

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

                <div className="d-flex align-items-center">

                    <button
                        className="btn btn-outline-secondary me-3"
                        onClick={() =>
                            navigate("/assignments")
                        }
                    >
                        ← Back
                    </button>

                    <div>

                        <h3 className="fw-bold mb-1">
                            Assignment Details
                        </h3>

                        <p className="text-muted mb-0">
                            View complete assignment information
                        </p>

                    </div>

                </div>


                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate(
                            `/assignments/edit/${extractAssignmentId(
                                assignment
                            )}`
                        )
                    }
                >
                    ✏️ Edit Assignment
                </button>

            </div>


            {/* ================================================= */}
            {/* MAIN CARD */}
            {/* ================================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    {/* ================================================= */}
                    {/* TITLE */}
                    {/* ================================================= */}

                    <div className="d-flex justify-content-between align-items-start mb-4">

                        <div>

                            <h4 className="fw-bold mb-2">
                                {assignment.title ||
                                    "Untitled Assignment"}
                            </h4>

                            <span className="badge bg-light text-dark border">
                                {assignment.subject ||
                                    "No Subject"}
                            </span>

                        </div>


                        <span
                            className={`badge ${getStatusBadge(
                                assignment.status
                            )} fs-6`}
                        >
                            {assignment.status ||
                                "ACTIVE"}
                        </span>

                    </div>


                    {/* ================================================= */}
                    {/* DESCRIPTION */}
                    {/* ================================================= */}

                    <div className="card bg-light border-0 mb-4">

                        <div className="card-body">

                            <h6 className="fw-bold">
                                Description
                            </h6>

                            <p className="mb-0 text-muted">

                                {assignment.description ||
                                    "No description provided."}

                            </p>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* INFORMATION */}
                    {/* ================================================= */}

                    <div className="row g-4">

                        <div className="col-md-6">

                            <div className="card h-100 border">

                                <div className="card-body">

                                    <h6 className="fw-bold mb-3">
                                        Assignment Allocation
                                    </h6>

                                    <div className="mb-3">

                                        <small className="text-muted">
                                            Teacher
                                        </small>

                                        <div className="fw-semibold">
                                            {
                                                assignment.teacher ||
                                                "-"
                                            }
                                        </div>

                                    </div>


                                    <div className="mb-3">

                                        <small className="text-muted">
                                            Batch
                                        </small>

                                        <div className="fw-semibold">
                                            {
                                                assignment.batch ||
                                                "-"
                                            }
                                        </div>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Classroom
                                        </small>

                                        <div className="fw-semibold">
                                            {
                                                assignment.classroom ||
                                                "-"
                                            }
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6">

                            <div className="card h-100 border">

                                <div className="card-body">

                                    <h6 className="fw-bold mb-3">
                                        Schedule & Marks
                                    </h6>

                                    <div className="row">

                                        <div className="col-6 mb-3">

                                            <small className="text-muted">
                                                Assigned Date
                                            </small>

                                            <div className="fw-semibold">
                                                {
                                                    assignment.assignedDate ||
                                                    "-"
                                                }
                                            </div>

                                        </div>


                                        <div className="col-6 mb-3">

                                            <small className="text-muted">
                                                Due Date
                                            </small>

                                            <div className="fw-semibold">
                                                {
                                                    assignment.dueDate ||
                                                    "-"
                                                }
                                            </div>

                                        </div>


                                        <div className="col-6">

                                            <small className="text-muted">
                                                Maximum Marks
                                            </small>

                                            <div className="fw-semibold">
                                                {
                                                    assignment.maxMarks ??
                                                    0
                                                }
                                            </div>

                                        </div>


                                        <div className="col-6">

                                            <small className="text-muted">
                                                Status
                                            </small>

                                            <div>

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

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ViewAssignment;