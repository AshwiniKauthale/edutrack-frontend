import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createClassroom } from "../../api/classroomApi";

const CreateClassroom = () => {

    const navigate = useNavigate();

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({
        name: "",
        roomNumber: "",
        building: "",
        floor: "",
        capacity: "",
        roomType: "",
        facilities: "",
        status: "AVAILABLE",
        description: ""
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        // -------------------------------------------------
        // BASIC VALIDATION
        // -------------------------------------------------

        if (!formData.name.trim()) {
            setError("Classroom name is required.");
            return;
        }

        if (!formData.roomNumber.trim()) {
            setError("Room number is required.");
            return;
        }

        if (!formData.capacity || Number(formData.capacity) <= 0) {
            setError("Please enter a valid capacity.");
            return;
        }

        if (!formData.roomType) {
            setError("Please select a room type.");
            return;
        }

        try {

            setSaving(true);

            // -------------------------------------------------
            // CREATE CLASSROOM
            // -------------------------------------------------

            await createClassroom({
                name: formData.name,
                roomNumber: formData.roomNumber,
                building: formData.building,

                floor:
                    formData.floor === ""
                        ? 0
                        : Number(formData.floor),

                capacity:
                    Number(formData.capacity),

                roomType: formData.roomType,

                facilities: formData.facilities,

                status: formData.status,

                description: formData.description
            });

            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            alert("Classroom created successfully!");

            navigate("/classrooms");

        } catch (err) {

            console.error(
                "Error creating classroom:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to create classroom."
            );

        } finally {

            setSaving(false);
        }
    };

    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="container-fluid px-4 py-4">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Add Classroom
                    </h2>

                    <p className="text-muted mb-0">
                        Create a new classroom
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        navigate("/classrooms")
                    }
                >
                    ← Back to Classrooms
                </button>

            </div>


            {/* ================================================= */}
            {/* ERROR MESSAGE */}
            {/* ================================================= */}

            {error && (

                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    {typeof error === "string"
                        ? error
                        : "Something went wrong."}
                </div>

            )}


            {/* ================================================= */}
            {/* FORM CARD */}
            {/* ================================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* ================================================= */}
                            {/* CLASSROOM NAME */}
                            {/* ================================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Classroom Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter classroom name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* ================================================= */}
                            {/* ROOM NUMBER */}
                            {/* ================================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Room Number
                                </label>

                                <input
                                    type="text"
                                    name="roomNumber"
                                    className="form-control"
                                    placeholder="Enter room number"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* ================================================= */}
                            {/* BUILDING */}
                            {/* ================================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Building
                                </label>

                                <input
                                    type="text"
                                    name="building"
                                    className="form-control"
                                    placeholder="Enter building name"
                                    value={formData.building}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* ================================================= */}
                            {/* FLOOR */}
                            {/* ================================================= */}

                            <div className="col-md-3">

                                <label className="form-label fw-semibold">
                                    Floor
                                </label>

                                <input
                                    type="number"
                                    name="floor"
                                    className="form-control"
                                    placeholder="Floor"
                                    min="0"
                                    value={formData.floor}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* ================================================= */}
                            {/* CAPACITY */}
                            {/* ================================================= */}

                            <div className="col-md-3">

                                <label className="form-label fw-semibold">
                                    Capacity
                                </label>

                                <input
                                    type="number"
                                    name="capacity"
                                    className="form-control"
                                    placeholder="Capacity"
                                    min="1"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* ================================================= */}
                            {/* ROOM TYPE */}
                            {/* ================================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Room Type
                                </label>

                                <select
                                    name="roomType"
                                    className="form-select"
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select room type
                                    </option>

                                    <option value="CLASSROOM">
                                        Classroom
                                    </option>

                                    <option value="COMPUTER_LAB">
                                        Computer Lab
                                    </option>

                                    <option value="LAB">
                                        Laboratory
                                    </option>

                                    <option value="SEMINAR_HALL">
                                        Seminar Hall
                                    </option>

                                    <option value="LECTURE_HALL">
                                        Lecture Hall
                                    </option>

                                </select>

                            </div>


                            {/* ================================================= */}
                            {/* STATUS */}
                            {/* ================================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="AVAILABLE">
                                        Available
                                    </option>

                                    <option value="OCCUPIED">
                                        Occupied
                                    </option>

                                    <option value="MAINTENANCE">
                                        Maintenance
                                    </option>

                                    <option value="INACTIVE">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            {/* ================================================= */}
                            {/* FACILITIES */}
                            {/* ================================================= */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Facilities
                                </label>

                                <input
                                    type="text"
                                    name="facilities"
                                    className="form-control"
                                    placeholder="e.g. Projector, AC, Wi-Fi, Smart Board"
                                    value={formData.facilities}
                                    onChange={handleChange}
                                />

                                <small className="text-muted">
                                    Enter available facilities separated by commas.
                                </small>

                            </div>


                            {/* ================================================= */}
                            {/* DESCRIPTION */}
                            {/* ================================================= */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter classroom description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* BUTTONS */}
                        {/* ================================================= */}

                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    navigate("/classrooms")
                                }
                                disabled={saving}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={saving}
                            >

                                {saving ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        />

                                        Creating...

                                    </>

                                ) : (

                                    "Create Classroom"

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateClassroom;