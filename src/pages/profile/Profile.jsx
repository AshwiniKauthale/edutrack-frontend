import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../../api/profileApi";


// =====================================================
// PROFILE
// =====================================================

const Profile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD PROFILE
    // =====================================================

    const loadProfile = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getProfile();

            console.log(
                "PROFILE RESPONSE:",
                response.data
            );

            setProfile(response.data);

        } catch (err) {

            console.error(
                "Error loading profile:",
                err
            );

            if (
                err.response &&
                err.response.status === 401
            ) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (
                err.response &&
                err.response.status === 403
            ) {

                setError(
                    "You do not have permission to access your profile."
                );

            } else {

                setError(
                    "Unable to load profile."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadProfile();

    }, []);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="container-fluid py-4">

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "400px" }}
                >

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >

                        <span className="visually-hidden">
                            Loading...
                        </span>

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

                    <div className="d-flex justify-content-between align-items-center">

                        <span>
                            {error}
                        </span>

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={loadProfile}
                        >
                            Retry
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // MAIN UI
    // =====================================================

    return (

        <div className="container-fluid py-4">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3 className="fw-bold mb-1">
                        My Profile
                    </h3>

                    <p className="text-muted mb-0">
                        View and manage your account information
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            navigate("/profile/edit")
                        }
                    >

                        <i className="bi bi-pencil me-2"></i>

                        Edit Profile

                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                            navigate(
                                "/profile/change-password"
                            )
                        }
                    >

                        <i className="bi bi-key me-2"></i>

                        Change Password

                    </button>

                </div>

            </div>


            {/* =================================================
                PROFILE CARD
            ================================================= */}

            <div className="row g-4">

                {/* =================================================
                    LEFT PROFILE CARD
                ================================================= */}

                <div className="col-lg-4">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body text-center p-4">

                            {/* PROFILE ICON */}

                            <div
                                className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{
                                    width: "100px",
                                    height: "100px"
                                }}
                            >

                                <i className="bi bi-person-fill fs-1"></i>

                            </div>


                            {/* NAME */}

                            <h4 className="fw-bold mb-1">

                                {
                                    profile?.fullName ||
                                    "User"
                                }

                            </h4>


                            {/* USERNAME */}

                            <p className="text-muted mb-3">

                                @
                                {
                                    profile?.username ||
                                    "-"
                                }

                            </p>


                            {/* ROLE */}

                            <span className="badge bg-primary px-3 py-2">

                                {
                                    profile?.role ||
                                    "USER"
                                }

                            </span>


                            {/* STATUS */}

                            <div className="mt-3">

                                {
                                    profile?.active ? (

                                        <span className="badge bg-success-subtle text-success">

                                            <i className="bi bi-check-circle me-1"></i>

                                            Active

                                        </span>

                                    ) : (

                                        <span className="badge bg-danger-subtle text-danger">

                                            <i className="bi bi-x-circle me-1"></i>

                                            Inactive

                                        </span>

                                    )
                                }

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    PROFILE INFORMATION
                ================================================= */}

                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm">

                        <div className="card-header bg-white border-0 p-4">

                            <h5 className="fw-bold mb-0">

                                <i className="bi bi-person-lines-fill text-primary me-2"></i>

                                Personal Information

                            </h5>

                        </div>


                        <div className="card-body p-4">

                            <div className="row g-4">

                                {/* FULL NAME */}

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Full Name
                                    </label>

                                    <div className="fw-semibold mt-1">

                                        {
                                            profile?.fullName ||
                                            "-"
                                        }

                                    </div>

                                </div>


                                {/* USERNAME */}

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Username
                                    </label>

                                    <div className="fw-semibold mt-1">

                                        {
                                            profile?.username ||
                                            "-"
                                        }

                                    </div>

                                </div>


                                {/* EMAIL */}

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Email
                                    </label>

                                    <div className="fw-semibold mt-1">

                                        {
                                            profile?.email ||
                                            "-"
                                        }

                                    </div>

                                </div>


                                {/* MOBILE */}

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Mobile
                                    </label>

                                    <div className="fw-semibold mt-1">

                                        {
                                            profile?.mobile ||
                                            "-"
                                        }

                                    </div>

                                </div>


                                {/* ROLE */}

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Role
                                    </label>

                                    <div className="fw-semibold mt-1">

                                        {
                                            profile?.role ||
                                            "-"
                                        }

                                    </div>

                                </div>


                                {/* SUBJECT */}

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Subject
                                    </label>

                                    <div className="fw-semibold mt-1">

                                        {
                                            profile?.subject ||
                                            "-"
                                        }

                                    </div>

                                </div>


                                {/* QUALIFICATION */}

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Qualification
                                    </label>

                                    <div className="fw-semibold mt-1">

                                        {
                                            profile?.qualification ||
                                            "-"
                                        }

                                    </div>

                                </div>


                                {/* STATUS */}

                                <div className="col-md-6">

                                    <label className="text-muted small">
                                        Account Status
                                    </label>

                                    <div className="fw-semibold mt-1">

                                        {
                                            profile?.active
                                                ? "Active"
                                                : "Inactive"
                                        }

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

export default Profile;