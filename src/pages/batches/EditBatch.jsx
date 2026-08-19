import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getBatchById,
    updateBatch
} from "../../api/batchApi";

const EditBatch = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        fees: "",
        trainer: "",
        duration: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "ACTIVE",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD BATCH
    // =====================================================

    useEffect(() => {

        if (id) {
            loadBatch();
        }

    }, [id]);


    const loadBatch = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getBatchById(id);

            console.log(
                "BATCH DETAILS RESPONSE:",
                response
            );

            const batch = response.data;

            setFormData({
                name: batch.name || "",
                fees: batch.fees ?? "",
                trainer: batch.trainer || "",
                duration: batch.duration ?? "",
                description: batch.description || "",
                startDate: batch.startDate || "",
                endDate: batch.endDate || "",
                status: batch.status || "ACTIVE",
            });

        } catch (err) {

            console.error(
                "Error loading batch:",
                err
            );

            setError(
                err.response?.data ||
                "Unable to load batch details."
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // INPUT CHANGE
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

        try {

            setSaving(true);
            setError("");

            await updateBatch(
                id,
                {
                    ...formData,
                    fees: Number(formData.fees),
                    duration: Number(formData.duration),
                }
            );

            alert(
                "Batch updated successfully!"
            );

            navigate("/batches");

        } catch (err) {

            console.error(
                "Error updating batch:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to update batch."
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
            <div className="container-fluid px-4 py-4">

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center py-5">

                        <div
                            className="spinner-border text-primary mb-3"
                            role="status"
                        />

                        <h6>
                            Loading batch details...
                        </h6>

                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="container-fluid px-4 py-4">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Edit Batch
                    </h2>

                    <p className="text-muted mb-0">
                        Update batch information
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/batches")}
                >
                    ← Back to Batches
                </button>

            </div>


            {/* ERROR */}

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


            {/* FORM CARD */}

            <div className="card shadow-sm border-0">

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* BATCH NAME */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Batch Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter batch name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* FEES */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Fees
                                </label>

                                <input
                                    type="number"
                                    name="fees"
                                    className="form-control"
                                    placeholder="Enter fees"
                                    min="0"
                                    value={formData.fees}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* TRAINER */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Trainer
                                </label>

                                <input
                                    type="text"
                                    name="trainer"
                                    className="form-control"
                                    placeholder="Enter trainer name"
                                    value={formData.trainer}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* DURATION */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Duration
                                </label>

                                <input
                                    type="number"
                                    name="duration"
                                    className="form-control"
                                    placeholder="Duration"
                                    min="1"
                                    value={formData.duration}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* START DATE */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    name="startDate"
                                    className="form-control"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* END DATE */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    name="endDate"
                                    className="form-control"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* STATUS */}

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

                                    <option value="ACTIVE">
                                        Active
                                    </option>

                                    <option value="INACTIVE">
                                        Inactive
                                    </option>

                                    <option value="COMPLETED">
                                        Completed
                                    </option>

                                </select>

                            </div>


                            {/* DESCRIPTION */}

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter batch description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    navigate("/batches")
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
                                            role="status"
                                        />

                                        Updating...
                                    </>
                                ) : (
                                    "Update Batch"
                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditBatch;