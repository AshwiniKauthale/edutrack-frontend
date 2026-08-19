import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../utils/Auth";

export default function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setError("");
        setSuccess("");
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // -------------------------------
        // Validation
        // -------------------------------

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


            // -------------------------------
            // Register user
            // -------------------------------

            const response = await register({
                fullName: formData.fullName.trim(),
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password
            });


            console.log("Registration response:", response);


            setSuccess(
                response?.message ||
                "Account created successfully!"
            );


            // Clear form

            setFormData({
                fullName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });


            // Redirect to login

            setTimeout(() => {

                navigate("/login");

            }, 1800);


        } catch (error) {

            console.error("Registration error:", error);


            if (error.response?.data) {

                const data = error.response.data;


                if (typeof data === "string") {

                    setError(data);

                } else if (data.message) {

                    setError(data.message);

                } else {

                    setError("Unable to create account.");

                }

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
                MAIN CARD
            ================================================= */}

            <div
                style={{
                    width: "100%",

                    maxWidth: "1000px",

                    minHeight: "680px",

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
                            Start managing your
                            classroom smarter.
                        </h2>


                        <p
                            style={{
                                fontSize: "17px",

                                lineHeight: "1.7",

                                opacity: "0.9",

                                maxWidth: "430px"
                            }}
                        >
                            Create your EduTrack account and
                            manage students, teachers, batches,
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

                        padding: "45px 55px",

                        display: "flex",

                        flexDirection: "column",

                        justifyContent: "center",

                        backgroundColor: "#ffffff"
                    }}
                >

                    <div>

                        {/* HEADER */}

                        <h2
                            style={{
                                fontSize: "32px",

                                marginBottom: "8px",

                                color: "#111827"
                            }}
                        >
                            Create Account
                        </h2>


                        <p
                            style={{
                                color: "#6b7280",

                                marginBottom: "25px",

                                fontSize: "15px"
                            }}
                        >
                            Create your account to get started
                        </p>


                        {/* ERROR */}

                        {error && (

                            <div
                                style={{
                                    backgroundColor: "#fee2e2",

                                    color: "#b91c1c",

                                    padding: "12px 15px",

                                    borderRadius: "8px",

                                    marginBottom: "18px",

                                    fontSize: "14px"
                                }}
                            >
                                {error}
                            </div>

                        )}


                        {/* SUCCESS */}

                        {success && (

                            <div
                                style={{
                                    backgroundColor: "#dcfce7",

                                    color: "#166534",

                                    padding: "12px 15px",

                                    borderRadius: "8px",

                                    marginBottom: "18px",

                                    fontSize: "14px"
                                }}
                            >
                                ✓ {success}
                            </div>

                        )}


                        {/* FORM */}

                        <form onSubmit={handleSubmit}>


                            {/* FULL NAME */}

                            <label
                                style={{
                                    display: "block",

                                    fontWeight: "600",

                                    marginBottom: "7px",

                                    color: "#111827"
                                }}
                            >
                                Full Name
                            </label>


                            <div
                                style={{
                                    position: "relative",

                                    marginBottom: "16px"
                                }}
                            >

                                <span
                                    style={{
                                        position: "absolute",

                                        left: "15px",

                                        top: "50%",

                                        transform:
                                            "translateY(-50%)",

                                        fontSize: "18px"
                                    }}
                                >
                                    👤
                                </span>


                                <input
                                    type="text"

                                    name="fullName"

                                    placeholder="Enter your full name"

                                    value={formData.fullName}

                                    onChange={handleChange}

                                    autoComplete="name"

                                    style={inputStyle}
                                />

                            </div>


                            {/* USERNAME */}

                            <label
                                style={{
                                    display: "block",

                                    fontWeight: "600",

                                    marginBottom: "7px",

                                    color: "#111827"
                                }}
                            >
                                Username
                            </label>


                            <div
                                style={{
                                    position: "relative",

                                    marginBottom: "16px"
                                }}
                            >

                                <span
                                    style={{
                                        position: "absolute",

                                        left: "15px",

                                        top: "50%",

                                        transform:
                                            "translateY(-50%)",

                                        fontSize: "18px",

                                        color: "#4c1d95"
                                    }}
                                >
                                    @
                                </span>


                                <input
                                    type="text"

                                    name="username"

                                    placeholder="Choose a username"

                                    value={formData.username}

                                    onChange={handleChange}

                                    autoComplete="username"

                                    style={inputStyle}
                                />

                            </div>


                            {/* EMAIL */}

                            <label
                                style={{
                                    display: "block",

                                    fontWeight: "600",

                                    marginBottom: "7px",

                                    color: "#111827"
                                }}
                            >
                                Email Address
                            </label>


                            <div
                                style={{
                                    position: "relative",

                                    marginBottom: "16px"
                                }}
                            >

                                <span
                                    style={{
                                        position: "absolute",

                                        left: "15px",

                                        top: "50%",

                                        transform:
                                            "translateY(-50%)",

                                        fontSize: "18px"
                                    }}
                                >
                                    ✉️
                                </span>


                                <input
                                    type="email"

                                    name="email"

                                    placeholder="Enter your email"

                                    value={formData.email}

                                    onChange={handleChange}

                                    autoComplete="email"

                                    style={inputStyle}
                                />

                            </div>


                            {/* PASSWORD */}

                            <label
                                style={{
                                    display: "block",

                                    fontWeight: "600",

                                    marginBottom: "7px",

                                    color: "#111827"
                                }}
                            >
                                Password
                            </label>


                            <div
                                style={{
                                    position: "relative",

                                    marginBottom: "16px"
                                }}
                            >

                                <span
                                    style={{
                                        position: "absolute",

                                        left: "15px",

                                        top: "50%",

                                        transform:
                                            "translateY(-50%)",

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

                                    name="password"

                                    placeholder="Create a password"

                                    value={formData.password}

                                    onChange={handleChange}

                                    autoComplete="new-password"

                                    style={{
                                        ...inputStyle,

                                        paddingRight: "48px"
                                    }}
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }

                                    style={eyeButtonStyle}
                                >
                                    {showPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>

                            </div>


                            {/* CONFIRM PASSWORD */}

                            <label
                                style={{
                                    display: "block",

                                    fontWeight: "600",

                                    marginBottom: "7px",

                                    color: "#111827"
                                }}
                            >
                                Confirm Password
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

                                        transform:
                                            "translateY(-50%)",

                                        fontSize: "18px"
                                    }}
                                >
                                    🔒
                                </span>


                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }

                                    name="confirmPassword"

                                    placeholder="Confirm your password"

                                    value={
                                        formData.confirmPassword
                                    }

                                    onChange={handleChange}

                                    autoComplete="new-password"

                                    style={{
                                        ...inputStyle,

                                        paddingRight: "48px"
                                    }}
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }

                                    style={eyeButtonStyle}
                                >
                                    {showConfirmPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>

                            </div>


                            {/* CREATE ACCOUNT BUTTON */}

                            <button
                                type="submit"

                                disabled={loading}

                                style={{
                                    width: "100%",

                                    padding: "14px",

                                    backgroundColor:
                                        loading
                                            ? "#93c5fd"
                                            : "#2563eb",

                                    color: "#ffffff",

                                    border: "none",

                                    borderRadius: "10px",

                                    fontSize: "16px",

                                    fontWeight: "600",

                                    cursor: loading
                                        ? "not-allowed"
                                        : "pointer",

                                    transition:
                                        "background-color 0.2s"
                                }}
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}

                            </button>

                        </form>


                        {/* LOGIN */}

                        <div
                            style={{
                                textAlign: "center",

                                marginTop: "22px",

                                fontSize: "14px"
                            }}
                        >

                            <span
                                style={{
                                    color: "#6b7280"
                                }}
                            >
                                Already have an account?
                            </span>{" "}

                            <Link
                                to="/login"

                                style={{
                                    color: "#4338ca",

                                    fontWeight: "600",

                                    textDecoration: "none"
                                }}
                            >
                                Login
                            </Link>

                        </div>


                        {/* SECURITY MESSAGE */}

                        <div
                            style={{
                                textAlign: "center",

                                marginTop: "20px",

                                color: "#9ca3af",

                                fontSize: "12px"
                            }}
                        >
                            🔒 Your account is protected with
                            secure authentication.
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


/* =================================================
   INPUT STYLE
================================================= */

const inputStyle = {
    width: "100%",

    padding: "13px 15px 13px 45px",

    border: "1px solid #d1d5db",

    borderRadius: "10px",

    fontSize: "15px",

    boxSizing: "border-box",

    outline: "none",

    color: "#111827",

    backgroundColor: "#ffffff"
};


/* =================================================
   EYE BUTTON
================================================= */

const eyeButtonStyle = {
    position: "absolute",

    right: "10px",

    top: "50%",

    transform: "translateY(-50%)",

    border: "none",

    background: "transparent",

    cursor: "pointer",

    fontSize: "17px"
};


/* =================================================
   FEATURE COMPONENT
================================================= */

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

                marginBottom: "25px"
            }}
        >

            <div
                style={{
                    width: "55px",

                    height: "55px",

                    borderRadius: "12px",

                    backgroundColor:
                        "rgba(255,255,255,0.16)",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    fontSize: "25px",

                    marginRight: "16px",

                    flexShrink: 0
                }}
            >
                {icon}
            </div>


            <div>

                <h3
                    style={{
                        fontSize: "16px",

                        margin: "0 0 5px 0",

                        fontWeight: "700"
                    }}
                >
                    {title}
                </h3>


                <p
                    style={{
                        fontSize: "13px",

                        margin: 0,

                        opacity: 0.8
                    }}
                >
                    {description}
                </p>

            </div>

        </div>
    );
}