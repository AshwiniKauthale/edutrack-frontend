import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    changePassword
} from "../../api/profileApi";


// =====================================================
// CHANGE PASSWORD
// =====================================================

const ChangePassword = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });


    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


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


        if (
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {

            setError(
                "Please fill all password fields."
            );

            return;
        }


        if (
            formData.newPassword.length < 6
        ) {

            setError(
                "New password must contain at least 6 characters."
            );

            return;
        }


        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            setError(
                "New password and confirm password do not match."
            );

            return;
        }


        try {

            setSaving(true);

            await changePassword({
                currentPassword:
                    formData.currentPassword,

                newPassword:
                    formData.newPassword
            });


            setSuccess(
                "Password changed successfully."
            );


            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });


        } catch (err) {

            console.error(
                "Change password error:",
                err
            );


            if (
                err.response?.status === 400
            ) {

                setError(
                    err.response?.data?.message ||
                    "Current password is incorrect."
                );

            } else if (
                err.response?.status === 401
            ) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else {

                setError(
                    "Unable to change password."
                );
            }

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="container-fluid py-4">

            <div className="mb-4">

                <h3 className="fw-bold mb-1">
                    Change Password
                </h3>

                <p className="text-muted mb-0">
                    Update your account password
                </p>

            </div>


            <div className="row">

                <div className="col-lg-7">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            {error && (

                                <div className="alert alert-danger">

                                    <i className="bi bi-exclamation-circle me-2"></i>

                                    {error}

                                </div>

                            )}


                            {success && (

                                <div className="alert alert-success">

                                    <i className="bi bi-check-circle me-2"></i>

                                    {success}

                                </div>

                            )}


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >

                                {/* CURRENT PASSWORD */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        Current Password

                                    </label>

                                    <input
                                        type="password"
                                        name="currentPassword"
                                        className="form-control"
                                        value={
                                            formData.currentPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter current password"
                                    />

                                </div>


                                {/* NEW PASSWORD */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        New Password

                                    </label>

                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="form-control"
                                        value={
                                            formData.newPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter new password"
                                    />

                                </div>


                                {/* CONFIRM PASSWORD */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        Confirm New Password

                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Confirm new password"
                                    />

                                </div>


                                {/* BUTTONS */}

                                <div className="d-flex justify-content-end gap-2">

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            navigate(
                                                "/profile"
                                            )
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

                                                Updating...
                                            </>

                                        ) : (

                                            <>
                                                <i className="bi bi-key me-2"></i>

                                                Change Password
                                            </>

                                        )}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>


                <div className="col-lg-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            <h5 className="fw-bold">

                                <i className="bi bi-shield-lock text-primary me-2"></i>

                                Password Tips

                            </h5>

                            <hr />

                            <ul className="text-muted">

                                <li className="mb-2">
                                    Use at least 6 characters.
                                </li>

                                <li className="mb-2">
                                    Avoid using easily guessed passwords.
                                </li>

                                <li className="mb-2">
                                    Do not share your password.
                                </li>

                                <li>
                                    Use a combination of letters,
                                    numbers and special characters.
                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ChangePassword;