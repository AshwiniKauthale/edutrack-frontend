import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getClassroomById,
    updateClassroom
} from "../../api/classroomApi";

const EditClassroom = () => {

    const { id } = useParams();
    const navigate = useNavigate();

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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        loadClassroom();

    }, [id]);


    const loadClassroom = async () => {

        try {

            setLoading(true);

            const response =
                await getClassroomById(id);

            const classroom =
                response.data;

            setFormData({
                name: classroom.name || "",
                roomNumber: classroom.roomNumber || "",
                building: classroom.building || "",
                floor: classroom.floor ?? "",
                capacity: classroom.capacity ?? "",
                roomType: classroom.roomType || "",
                facilities: classroom.facilities || "",
                status: classroom.status || "AVAILABLE",
                description: classroom.description || ""
            });

        } catch (err) {

            console.error(
                "Error loading classroom:",
                err
            );

            setError(
                err.response?.data ||
                "Unable to load classroom."
            );

        } finally {

            setLoading(false);
        }
    };


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


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");

            await updateClassroom(
                id,
                {
                    ...formData,
                    floor: Number(formData.floor),
                    capacity: Number(formData.capacity)
                }
            );

            alert(
                "Classroom updated successfully!"
            );

            navigate("/classrooms");

        } catch (err) {

            console.error(
                "Error updating classroom:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to update classroom."
            );

        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (
            <div className="container-fluid px-4 py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

                <p className="mt-3">
                    Loading classroom...
                </p>

            </div>
        );
    }


    return (

        <div className="container-fluid px-4 py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Edit Classroom
                    </h2>

                    <p className="text-muted mb-0">
                        Update classroom information
                    </p>

                </div>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        navigate("/classrooms")
                    }
                >
                    ← Back to Classrooms
                </button>

            </div>


            {error && (

                <div className="alert alert-danger">
                    {typeof error === "string"
                        ? error
                        : "Something went wrong."}
                </div>

            )}


            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Classroom Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Room Number
                                </label>

                                <input
                                    type="text"
                                    name="roomNumber"
                                    className="form-control"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Building
                                </label>

                                <input
                                    type="text"
                                    name="building"
                                    className="form-control"
                                    value={formData.building}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-3">

                                <label className="form-label fw-semibold">
                                    Floor
                                </label>

                                <input
                                    type="number"
                                    name="floor"
                                    className="form-control"
                                    min="0"
                                    value={formData.floor}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-3">

                                <label className="form-label fw-semibold">
                                    Capacity
                                </label>

                                <input
                                    type="number"
                                    name="capacity"
                                    className="form-control"
                                    min="1"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


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


                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Facilities
                                </label>

                                <input
                                    type="text"
                                    name="facilities"
                                    className="form-control"
                                    value={formData.facilities}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    navigate("/classrooms")
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={saving}
                            >
                                {saving
                                    ? "Updating..."
                                    : "Update Classroom"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditClassroom;