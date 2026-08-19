import React, {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    createAssignment
} from "../../api/assignmentApi";

const CreateAssignment = () => {

    const navigate = useNavigate();


    // =====================================================
    // FORM
    // =====================================================

    const [formData, setFormData] = useState({

        title: "",
        subject: "",
        description: "",

        teacher: "",
        batch: "",
        classroom: "",

        assignedDate: "",
        dueDate: "",

        maxMarks: "",

        status: "ACTIVE"
    });


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value
            })
        );
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (!formData.title.trim()) {

            setError(
                "Assignment title is required."
            );

            return;
        }

        if (!formData.subject.trim()) {

            setError(
                "Subject is required."
            );

            return;
        }

        if (!formData.teacher.trim()) {

            setError(
                "Teacher is required."
            );

            return;
        }

        if (!formData.batch.trim()) {

            setError(
                "Batch is required."
            );

            return;
        }

        if (!formData.dueDate) {

            setError(
                "Due date is required."
            );

            return;
        }


        try {

            setLoading(true);


            const payload = {

                ...formData,

                maxMarks:
                    Number(formData.maxMarks) || 0,

                assignedDate:
                    formData.assignedDate || null
            };


            await createAssignment(payload);


            alert(
                "Assignment created successfully."
            );


            navigate("/assignments");


        } catch (err) {

            console.error(
                "Create assignment error:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to create assignment."
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="container-fluid py-4">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="d-flex align-items-center mb-4">

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
                        Create Assignment
                    </h3>

                    <p className="text-muted mb-0">
                        Add a new academic assignment
                    </p>

                </div>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

                <div className="alert alert-danger">
                    {error}
                </div>

            )}


            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        {/* ================================================= */}
                        {/* BASIC INFORMATION */}
                        {/* ================================================= */}

                        <h5 className="fw-bold mb-3">
                            Assignment Information
                        </h5>

                        <div className="row g-3">

                            {/* TITLE */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Assignment Title *
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter assignment title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* SUBJECT */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Subject *
                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    placeholder="Enter subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    rows="4"
                                    className="form-control"
                                    placeholder="Enter assignment description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>


                        <hr className="my-4" />


                        {/* ================================================= */}
                        {/* RELATION */}
                        {/* ================================================= */}

                        <h5 className="fw-bold mb-3">
                            Assignment Allocation
                        </h5>

                        <div className="row g-3">

                            {/* TEACHER */}

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Teacher *
                                </label>

                                <input
                                    type="text"
                                    name="teacher"
                                    className="form-control"
                                    placeholder="Enter teacher"
                                    value={
                                        formData.teacher
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* BATCH */}

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Batch *
                                </label>

                                <input
                                    type="text"
                                    name="batch"
                                    className="form-control"
                                    placeholder="Enter batch"
                                    value={
                                        formData.batch
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* CLASSROOM */}

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Classroom
                                </label>

                                <input
                                    type="text"
                                    name="classroom"
                                    className="form-control"
                                    placeholder="Enter classroom"
                                    value={
                                        formData.classroom
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>


                        <hr className="my-4" />


                        {/* ================================================= */}
                        {/* DATES AND MARKS */}
                        {/* ================================================= */}

                        <h5 className="fw-bold mb-3">
                            Schedule & Marks
                        </h5>

                        <div className="row g-3">

                            {/* ASSIGNED DATE */}

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Assigned Date
                                </label>

                                <input
                                    type="date"
                                    name="assignedDate"
                                    className="form-control"
                                    value={
                                        formData.assignedDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* DUE DATE */}

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Due Date *
                                </label>

                                <input
                                    type="date"
                                    name="dueDate"
                                    className="form-control"
                                    value={
                                        formData.dueDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* MARKS */}

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Maximum Marks
                                </label>

                                <input
                                    type="number"
                                    name="maxMarks"
                                    min="0"
                                    className="form-control"
                                    placeholder="Enter maximum marks"
                                    value={
                                        formData.maxMarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* STATUS */}

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

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


                        {/* ================================================= */}
                        {/* BUTTONS */}
                        {/* ================================================= */}

                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                disabled={loading}
                                onClick={() =>
                                    navigate(
                                        "/assignments"
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                        />
                                        Saving...
                                    </>

                                ) : (

                                    <>
                                        💾 Save Assignment
                                    </>

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateAssignment;