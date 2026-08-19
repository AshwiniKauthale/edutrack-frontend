import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    createTeacher
} from "../../api/teacherApi";

import "../teachers/TeacherForm.css";


export default function CreateTeacher() {

    const navigate =
        useNavigate();


    const [formData, setFormData] =
        useState({

            fullName: "",
            username: "",
            email: "",
            password: "",
            mobile: "",
            subject: "",
            qualification: ""

        });


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // CHANGE
    // =====================================================

    const handleChange =
        (event) => {

            const {
                name,
                value
            } = event.target;


            setFormData(
                previous => ({
                    ...previous,
                    [name]: value
                })
            );
        };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit =
        async (event) => {

            event.preventDefault();

            setError("");


            if (
                formData.password.length < 6
            ) {

                setError(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            try {

                setLoading(true);


                await createTeacher(
                    formData
                );


                alert(
                    "Teacher created successfully."
                );


                navigate("/teachers");


            } catch (err) {

                console.error(
                    "Create teacher error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    "Unable to create teacher."
                );


            } finally {

                setLoading(false);

            }
        };


    return (

        <div className="teacher-form-page">

            <div className="teacher-form-card">


                <button
                    type="button"
                    className="back-button"
                    onClick={() =>
                        navigate("/teachers")
                    }
                >
                    ← Back to Teachers
                </button>


                <h1>
                    Add Teacher
                </h1>

                <p>
                    Create a teacher account and
                    add teaching information.
                </p>


                {error && (

                    <div className="teacher-form-error">

                        ⚠️ {error}

                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="teacher-form"
                >


                    {/* FULL NAME */}

                    <div className="teacher-form-group">

                        <label>
                            Full Name *
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={
                                formData.fullName
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter full name"
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* USERNAME */}

                    <div className="teacher-form-group">

                        <label>
                            Username *
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={
                                formData.username
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter username"
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="teacher-form-group">

                        <label>
                            Email *
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="teacher@example.com"
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="teacher-form-group">

                        <label>
                            Password *
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={
                                formData.password
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Minimum 6 characters"
                            required
                            minLength={6}
                            disabled={loading}
                        />

                    </div>


                    {/* MOBILE */}

                    <div className="teacher-form-group">

                        <label>
                            Mobile Number
                        </label>

                        <input
                            type="tel"
                            name="mobile"
                            value={
                                formData.mobile
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter mobile number"
                            disabled={loading}
                        />

                    </div>


                    {/* SUBJECT */}

                    <div className="teacher-form-group">

                        <label>
                            Subject
                        </label>

                        <input
                            type="text"
                            name="subject"
                            value={
                                formData.subject
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. Java, Mathematics"
                            disabled={loading}
                        />

                    </div>


                    {/* QUALIFICATION */}

                    <div className="teacher-form-group">

                        <label>
                            Qualification
                        </label>

                        <input
                            type="text"
                            name="qualification"
                            value={
                                formData.qualification
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. M.Tech, MCA"
                            disabled={loading}
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="teacher-form-actions">

                        <button
                            type="button"
                            className="teacher-cancel-btn"
                            onClick={() =>
                                navigate("/teachers")
                            }
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="teacher-submit-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating..."
                                : "Create Teacher"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}