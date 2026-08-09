import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import {
    login,
    isAuthenticated,
    getFullName,
    getRole
} from "../../utils/Auth";

export default function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // If already logged in, go directly to dashboard
    // =====================================================

    useEffect(() => {

        if (isAuthenticated()) {

            navigate("/dashboard", {
                replace: true
            });

        }

    }, [navigate]);


    // =====================================================
    // Handle Login
    // =====================================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        // -------------------------------
        // Validation
        // -------------------------------

        if (!usernameOrEmail.trim()) {

            setError("Please enter your username or email.");

            return;
        }


        if (!password.trim()) {

            setError("Please enter your password.");

            return;
        }


        try {

            setLoading(true);


            // =================================================
            // Call Spring Boot Login API
            // =================================================

            const response = await login(
                usernameOrEmail.trim(),
                password
            );


            console.log("Login response:", response);


            // =================================================
            // Get logged-in user's role
            // =================================================

            const role = getRole();

            const fullName = getFullName();


            console.log("Logged in user:", fullName);
            console.log("User role:", role);


            // =================================================
            // Login successful
            // =================================================

            setError("");


            /*
             * If the user originally tried to open a protected
             * page, send them there after login.
             *
             * Otherwise send them to dashboard.
             */

            const from = location.state?.from?.pathname;


            if (from && from !== "/") {

                navigate(from, {
                    replace: true
                });

            } else {

                navigate("/dashboard", {
                    replace: true
                });

            }


        } catch (error) {

            console.error("Login error:", error);


            // =================================================
            // Backend error message
            // =================================================

            if (error.response?.data) {

                const message = error.response.data;


                if (typeof message === "string") {

                    setError(message);

                } else if (message.message) {

                    setError(message.message);

                } else {

                    setError(
                        "Invalid username/email or password."
                    );

                }

            } else {

                setError(
                    "Unable to connect to the server. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                background:
                    "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",

                padding: "30px",
                boxSizing: "border-box"
            }}
        >

            {/* =================================================
                LOGIN CARD
            ================================================= */}

            <div
                style={{
                    width: "100%",
                    maxWidth: "1000px",

                    minHeight: "600px",

                    display: "flex",

                    backgroundColor: "#ffffff",

                    borderRadius: "20px",

                    overflow: "hidden",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.25)"
                }}
            >


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div
                    style={{
                        flex: 1,

                        background:
                            "linear-gradient(160deg, #1e3a8a, #3730a3)",

                        color: "#ffffff",

                        padding: "55px 45px",

                        display: "flex",

                        flexDirection: "column",

                        justifyContent: "center"
                    }}
                >

                    <div>

                        <h1
                            style={{
                                fontSize: "44px",
                                margin: "0 0 15px 0",
                                fontWeight: "700"
                            }}
                        >
                            EduTrack
                        </h1>


                        <div
                            style={{
                                width: "70px",
                                height: "4px",
                                backgroundColor: "#ffffff",
                                borderRadius: "5px",
                                marginBottom: "30px"
                            }}
                        />


                        <h2
                            style={{
                                fontSize: "32px",
                                lineHeight: "1.25",
                                marginBottom: "20px"
                            }}
                        >
                            Manage your classroom
                            smarter.
                        </h2>


                        <p
                            style={{
                                fontSize: "17px",
                                lineHeight: "1.7",
                                opacity: "0.9",
                                maxWidth: "430px"
                            }}
                        >
                            A centralized platform to manage
                            students, teachers, batches,
                            attendance and academic activities
                            with ease.
                        </p>


                        {/* FEATURES */}

                        <div
                            style={{
                                marginTop: "35px"
                            }}
                        >

                            <Feature
                                icon="🎓"
                                title="Student Management"
                                description="Manage student records efficiently."
                            />

                            <Feature
                                icon="📚"
                                title="Batch Management"
                                description="Organize classes and batches easily."
                            />

                            <Feature
                                icon="📊"
                                title="Attendance Tracking"
                                description="Track attendance and academic activities."
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div
                    style={{
                        flex: 1,

                        padding: "55px 55px",

                        display: "flex",

                        flexDirection: "column",

                        justifyContent: "center",

                        backgroundColor: "#ffffff"
                    }}
                >

                    <div>

                        <h2
                            style={{
                                fontSize: "32px",
                                marginBottom: "8px",
                                color: "#111827"
                            }}
                        >
                            Welcome Back
                        </h2>


                        <p
                            style={{
                                color: "#6b7280",
                                marginBottom: "35px",
                                fontSize: "15px"
                            }}
                        >
                            Sign in to continue to EduTrack
                        </p>


                        {/* =================================================
                            ERROR
                        ================================================= */}

                        {error && (

                            <div
                                style={{
                                    backgroundColor: "#fee2e2",
                                    color: "#b91c1c",

                                    padding: "12px 15px",

                                    borderRadius: "8px",

                                    marginBottom: "20px",

                                    fontSize: "14px"
                                }}
                            >
                                {error}
                            </div>

                        )}


                        {/* =================================================
                            FORM
                        ================================================= */}

                        <form onSubmit={handleLogin}>


                            {/* USERNAME / EMAIL */}

                            <label
                                style={{
                                    display: "block",
                                    fontWeight: "600",
                                    marginBottom: "8px",
                                    color: "#111827"
                                }}
                            >
                                Username or Email
                            </label>


                            <div
                                style={{
                                    position: "relative",
                                    marginBottom: "22px"
                                }}
                            >

                                <span
                                    style={{
                                        position: "absolute",
                                        left: "15px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        fontSize: "18px"
                                    }}
                                >
                                    👤
                                </span>


                                <input
                                    type="text"

                                    placeholder="Enter username or email"

                                    value={usernameOrEmail}

                                    onChange={(e) =>
                                        setUsernameOrEmail(
                                            e.target.value
                                        )
                                    }

                                    autoComplete="username"

                                    style={{
                                        width: "100%",

                                        padding: "14px 15px 14px 45px",

                                        border: "1px solid #d1d5db",

                                        borderRadius: "10px",

                                        fontSize: "15px",

                                        boxSizing: "border-box",

                                        outline: "none"
                                    }}
                                />

                            </div>


                            {/* PASSWORD */}

                            <label
                                style={{
                                    display: "block",
                                    fontWeight: "600",
                                    marginBottom: "8px",
                                    color: "#111827"
                                }}
                            >
                                Password
                            </label>


                            <div
                                style={{
                                    position: "relative"
                                }}
                            >

                                <span
                                    style={{
                                        position: "absolute",
                                        left: "15px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        fontSize: "18px"
                                    }}
                                >
                                    🔒
                                </span>


                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    placeholder="Enter your password"

                                    value={password}

                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }

                                    autoComplete="current-password"

                                    style={{
                                        width: "100%",

                                        padding:
                                            "14px 45px 14px 45px",

                                        border:
                                            "1px solid #d1d5db",

                                        borderRadius: "10px",

                                        fontSize: "15px",

                                        boxSizing: "border-box",

                                        outline: "none"
                                    }}
                                />


                                {/* SHOW PASSWORD */}

                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }

                                    style={{
                                        position: "absolute",

                                        right: "12px",

                                        top: "50%",

                                        transform:
                                            "translateY(-50%)",

                                        border: "none",

                                        background: "transparent",

                                        cursor: "pointer",

                                        fontSize: "18px"
                                    }}
                                >
                                    {showPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>

                            </div>


                            {/* REMEMBER ME */}

                            <div
                                style={{
                                    display: "flex",

                                    justifyContent:
                                        "space-between",

                                    alignItems: "center",

                                    marginTop: "18px",

                                    marginBottom: "25px"
                                }}
                            >

                                <label
                                    style={{
                                        display: "flex",

                                        alignItems: "center",

                                        gap: "8px",

                                        fontSize: "14px",

                                        color: "#4b5563",

                                        cursor: "pointer"
                                    }}
                                >

                                    <input
                                        type="checkbox"

                                        checked={rememberMe}

                                        onChange={(e) =>
                                            setRememberMe(
                                                e.target.checked
                                            )
                                        }
                                    />

                                    Remember me

                                </label>


                                <span
                                    style={{
                                        color: "#4338ca",

                                        fontSize: "14px",

                                        fontWeight: "600",

                                        cursor: "pointer"
                                    }}
                                >
                                    Forgot Password?
                                </span>

                            </div>


                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"

                                disabled={loading}

                                style={{
                                    width: "100%",

                                    padding: "14px",

                                    border: "none",

                                    borderRadius: "10px",

                                    background:
                                        loading
                                            ? "#9ca3af"
                                            : "#2563eb",

                                    color: "#ffffff",

                                    fontSize: "16px",

                                    fontWeight: "600",

                                    cursor:
                                        loading
                                            ? "not-allowed"
                                            : "pointer",

                                    transition:
                                        "0.2s"
                                }}
                            >

                                {loading
                                    ? "Signing in..."
                                    : "Login"}

                            </button>

                        </form>


                        {/* =================================================
                            SIGNUP
                        ================================================= */}

                        <p
                            style={{
                                textAlign: "center",

                                marginTop: "25px",

                                color: "#6b7280",

                                fontSize: "14px"
                            }}
                        >

                            Don't have an account?{" "}

                            <Link
                                to="/signup"

                                style={{
                                    color: "#4338ca",

                                    fontWeight: "600",

                                    textDecoration: "none"
                                }}
                            >
                                Create Account
                            </Link>

                        </p>


                        {/* SECURITY MESSAGE */}

                        <p
                            style={{
                                textAlign: "center",

                                marginTop: "25px",

                                color: "#9ca3af",

                                fontSize: "12px"
                            }}
                        >
                            🔒 Your account is protected with secure
                            authentication.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({
    icon,
    title,
    description
}) {

    return (

        <div
            style={{
                display: "flex",

                alignItems: "center",

                gap: "15px",

                marginBottom: "20px"
            }}
        >

            <div
                style={{
                    width: "50px",

                    height: "50px",

                    borderRadius: "12px",

                    background:
                        "rgba(255,255,255,0.15)",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    fontSize: "22px",

                    flexShrink: 0
                }}
            >
                {icon}
            </div>


            <div>

                <strong
                    style={{
                        display: "block",

                        fontSize: "16px",

                        marginBottom: "3px"
                    }}
                >
                    {title}
                </strong>


                <span
                    style={{
                        fontSize: "13px",

                        opacity: "0.8"
                    }}
                >
                    {description}
                </span>

            </div>

        </div>

    );
}