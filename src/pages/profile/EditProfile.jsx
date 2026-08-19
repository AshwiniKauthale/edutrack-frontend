import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProfile,
    updateProfile
} from "../../api/profileApi";


// =====================================================
// EDIT PROFILE
// =====================================================

const EditProfile = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        mobile: "",
        subject: "",
        qualification: ""
    });


    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =====================================================
    // LOAD PROFILE
    // =====================================================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                setLoading(true);

                const response =
                    await getProfile();

                const data =
                    response.data;

                setFormData({
                    fullName: data?.fullName || "",
                    username: data?.username || "",
                    email: data?.email || "",
                    mobile: data?.mobile || "",
                    subject: data?.subject || "",
                    qualification:
                        data?.qualification || ""
                });

            } catch (err) {

                console.error(
                    "Error loading profile:",
                    err
                );

                setError(
                    "Unable to load profile information."
                );

            } finally {

                setLoading(false);
            }
        };

        loadProfile();

    }, []);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setSuccess("");

        if (!formData.fullName.trim()) {

            setError(
                "Full name is required."
            );

            return;
        }

        if (!formData.email.trim()) {

            setError(
                "Email is required."
            );

            return;
        }

        try {

            setSaving(true);

            await updateProfile(formData);

            setSuccess(
                "Profile updated successfully."
            );

            setTimeout(() => {

                navigate("/profile");

            }, 1000);

        } catch (err) {

            console.error(
                "Error updating profile:",
                err
            );

            if (
                err.response?.status === 400
            ) {

                setError(
                    err.response?.data?.message ||
                    "Invalid profile information."
                );

            } else if (
                err.response?.status === 401
            ) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (
                err.response?.status === 403
            ) {

                setError(
                    "You do not have permission to update your profile."
                );

            } else {

                setError(
                    "Unable to update profile."
                );
            }

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

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "300px" }}
                >

                    <div className="spinner-border text-primary">

                        <span className="visually-hidden">
                            Loading...
                        </span>

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

            <div className="mb-4">

                <h3 className="fw-bold mb-1">
                    Edit Profile
                </h3>

                <p className="text-muted mb-0">
                    Update your personal information
                </p>

            </div>


            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    {/* ERROR */}

                    {error && (

                        <div className="alert alert-danger">

                            <i className="bi bi-exclamation-circle me-2"></i>

                            {error}

                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="alert alert-success">

                            <i className="bi bi-check-circle me-2"></i>

                            {success}

                        </div>

                    )}


                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* FULL NAME */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter full name"
                                />

                            </div>


                            {/* USERNAME */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Username

                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={
                                        formData.username
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter username"
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Email

                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter email"
                                />

                            </div>


                            {/* MOBILE */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Mobile

                                </label>

                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    value={
                                        formData.mobile
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter mobile number"
                                />

                            </div>


                            {/* SUBJECT */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Subject

                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    value={
                                        formData.subject
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter subject"
                                />

                            </div>


                            {/* QUALIFICATION */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Qualification

                                </label>

                                <input
                                    type="text"
                                    name="qualification"
                                    className="form-control"
                                    value={
                                        formData.qualification
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter qualification"
                                />

                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    navigate("/profile")
                                }
                                disabled={saving}
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
                                        ></span>

                                        Saving...
                                    </>

                                ) : (

                                    <>
                                        <i className="bi bi-check-lg me-2"></i>

                                        Save Changes
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

export default EditProfile;