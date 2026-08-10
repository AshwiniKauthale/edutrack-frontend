import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.fullName.trim() ||
            !formData.username.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${API_URL}/api/auth/signup`,
                {
                    fullName: formData.fullName.trim(),
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                }
            );

            setSuccess(
                response.data.message ||
                    "Account created successfully!"
            );

            setFormData({
                fullName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setTimeout(() => {
                navigate("/login");
            }, 1800);

        } catch (err) {
            console.error("Signup error:", err);

            if (err.response?.data) {
                setError(
                    typeof err.response.data === "string"
                        ? err.response.data
                        : "Unable to create account."
                );
            } else {
                setError(
                    "Unable to connect to the server. Please make sure the backend is running."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page min-vh-100 d-flex align-items-center py-4">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-xl-10">

                        <div className="card signup-card border-0 shadow-lg overflow-hidden">

                            <div className="row g-0">

                                {/* ========================= */}
                                {/* LEFT SIDE */}
                                {/* ========================= */}

                                <div className="col-lg-5 signup-left">

                                    <div className="p-4 p-lg-5 h-100 d-flex flex-column justify-content-center">

                                        <div className="brand-name mb-2">
                                            EduTrack
                                        </div>

                                        <div className="brand-line mb-4"></div>

                                        <h1 className="display-6 fw-bold mb-3">
                                            Start your journey
                                            <br />
                                            with EduTrack
                                        </h1>

                                        <p className="lead mb-5">
                                            Manage students, teachers,
                                            batches and attendance from
                                            one powerful platform.
                                        </p>

                                        {/* Feature 1 */}
                                        <Feature
                                            icon="🎓"
                                            title="Student Management"
                                            text="Manage student information easily."
                                        />

                                        {/* Feature 2 */}
                                        <Feature
                                            icon="📚"
                                            title="Batch Management"
                                            text="Organize classes and batches."
                                        />

                                        {/* Feature 3 */}
                                        <Feature
                                            icon="📊"
                                            title="Attendance Tracking"
                                            text="Monitor student attendance."
                                        />

                                        {/* Feature 4 */}
                                        <Feature
                                            icon="🔐"
                                            title="Secure Access"
                                            text="Role-based access for users."
                                        />

                                    </div>
                                </div>

                                {/* ========================= */}
                                {/* RIGHT SIDE */}
                                {/* ========================= */}

                                <div className="col-lg-7 bg-white">

                                    <div className="p-4 p-md-5">

                                        {/* Header */}

                                        <div className="text-center mb-4">

                                            <div className="signup-icon mx-auto mb-3">
                                                🎓
                                            </div>

                                            <h2 className="fw-bold mb-1">
                                                Create Account
                                            </h2>

                                            <p className="text-muted mb-0">
                                                Join EduTrack today
                                            </p>

                                        </div>

                                        {/* Error */}

                                        {error && (
                                            <div
                                                className="alert alert-danger py-2"
                                                role="alert"
                                            >
                                                ⚠️ {error}
                                            </div>
                                        )}

                                        {/* Success */}

                                        {success && (
                                            <div
                                                className="alert alert-success py-2"
                                                role="alert"
                                            >
                                                ✓ {success}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit}>

                                            {/* Full Name */}

                                            <div className="mb-3">

                                                <label
                                                    htmlFor="fullName"
                                                    className="form-label fw-semibold"
                                                >
                                                    Full Name
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-white">
                                                        👤
                                                    </span>

                                                    <input
                                                        id="fullName"
                                                        type="text"
                                                        name="fullName"
                                                        className="form-control"
                                                        placeholder="Enter your full name"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>

                                            {/* Username */}

                                            <div className="mb-3">

                                                <label
                                                    htmlFor="username"
                                                    className="form-label fw-semibold"
                                                >
                                                    Username
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-white">
                                                        @
                                                    </span>

                                                    <input
                                                        id="username"
                                                        type="text"
                                                        name="username"
                                                        className="form-control"
                                                        placeholder="Choose a username"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>

                                            {/* Email */}

                                            <div className="mb-3">

                                                <label
                                                    htmlFor="email"
                                                    className="form-label fw-semibold"
                                                >
                                                    Email Address
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-white">
                                                        ✉
                                                    </span>

                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter your email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>

                                            {/* Password */}

                                            <div className="mb-3">

                                                <label
                                                    htmlFor="password"
                                                    className="form-label fw-semibold"
                                                >
                                                    Password
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-white">
                                                        🔒
                                                    </span>

                                                    <input
                                                        id="password"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Create a password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                    >
                                                        {showPassword
                                                            ? "🙈"
                                                            : "👁"}
                                                    </button>

                                                </div>

                                                <div className="form-text">
                                                    Minimum 6 characters
                                                </div>

                                            </div>

                                            {/* Confirm Password */}

                                            <div className="mb-4">

                                                <label
                                                    htmlFor="confirmPassword"
                                                    className="form-label fw-semibold"
                                                >
                                                    Confirm Password
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-white">
                                                        🔒
                                                    </span>

                                                    <input
                                                        id="confirmPassword"
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="confirmPassword"
                                                        className="form-control"
                                                        placeholder="Confirm your password"
                                                        value={
                                                            formData.confirmPassword
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                    />

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword
                                                            )
                                                        }
                                                    >
                                                        {showConfirmPassword
                                                            ? "🙈"
                                                            : "👁"}
                                                    </button>

                                                </div>

                                            </div>

                                            {/* Create Account */}

                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100 py-2 fw-semibold signup-button"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                        ></span>

                                                        Creating Account...
                                                    </>
                                                ) : (
                                                    "Create Account"
                                                )}
                                            </button>

                                        </form>

                                        {/* Login */}

                                        <div className="text-center mt-4">

                                            <span className="text-muted">
                                                Already have an account?
                                            </span>{" "}

                                            <Link
                                                to="/login"
                                                className="fw-semibold text-decoration-none"
                                            >
                                                Login
                                            </Link>

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
}


/* ================================= */
/* FEATURE COMPONENT */
/* ================================= */

function Feature({ icon, title, text }) {
    return (
        <div className="d-flex align-items-center mb-4">

            <div className="feature-icon me-3">
                {icon}
            </div>

            <div>
                <h6 className="fw-bold mb-1">
                    {title}
                </h6>

                <p className="mb-0 small">
                    {text}
                </p>
            </div>

        </div>
    );
}