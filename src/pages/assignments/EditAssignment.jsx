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
    updateAssignment
} from "../../api/assignmentApi";

const EditAssignment = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    // =====================================================
    // STATE
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
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // LOAD ASSIGNMENT
    // =====================================================

    const loadAssignment = async () => {

        try {

            setLoading(true);
            setError("");

            const assignment =
                await getAssignmentById(id);

            setFormData({

                title:
                    assignment.title || "",

                subject:
                    assignment.subject || "",

                description:
                    assignment.description || "",

                teacher:
                    assignment.teacher || "",

                batch:
                    assignment.batch || "",

                classroom:
                    assignment.classroom || "",

                assignedDate:
                    assignment.assignedDate || "",

                dueDate:
                    assignment.dueDate || "",

                maxMarks:
                    assignment.maxMarks ?? "",

                status:
                    assignment.status || "ACTIVE"
            });

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


        try {

            setSaving(true);


            const payload = {

                ...formData,

                maxMarks:
                    Number(formData.maxMarks) || 0,

                assignedDate:
                    formData.assignedDate || null
            };


            await updateAssignment(
                id,
                payload
            );


            alert(
                "Assignment updated successfully."
            );


            navigate("/assignments");


        } catch (err) {

            console.error(
                "Update assignment error:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to update assignment."
            );

        } finally {

            setSaving(false);
        }
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
                        Edit Assignment
                    </h3>

                    <p className="text-muted mb-0">
                        Update assignment information
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

                        {/* BASIC */}

                        <h5 className="fw-bold mb-3">
                            Assignment Information
                        </h5>

                        <div className="row g-3">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Assignment Title *
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Subject *
                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    rows="4"
                                    className="form-control"
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


                        {/* ALLOCATION */}

                        <h5 className="fw-bold mb-3">
                            Assignment Allocation
                        </h5>

                        <div className="row g-3">

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Teacher *
                                </label>

                                <input
                                    type="text"
                                    name="teacher"
                                    className="form-control"
                                    value={
                                        formData.teacher
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Batch *
                                </label>

                                <input
                                    type="text"
                                    name="batch"
                                    className="form-control"
                                    value={
                                        formData.batch
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Classroom
                                </label>

                                <input
                                    type="text"
                                    name="classroom"
                                    className="form-control"
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


                        {/* SCHEDULE */}

                        <h5 className="fw-bold mb-3">
                            Schedule & Marks
                        </h5>

                        <div className="row g-3">

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


                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Due Date
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


                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Maximum Marks
                                </label>

                                <input
                                    type="number"
                                    name="maxMarks"
                                    min="0"
                                    className="form-control"
                                    value={
                                        formData.maxMarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


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


                        {/* BUTTONS */}

                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                disabled={saving}
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
                                disabled={saving}
                            >

                                {saving ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                        />

                                        Updating...
                                    </>

                                ) : (

                                    <>
                                        💾 Update Assignment
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

export default EditAssignment;