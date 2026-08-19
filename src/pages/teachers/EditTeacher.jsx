import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getTeacherById,
    updateTeacher
} from "../../api/teacherApi";

import "./TeacherForm.css";


export default function EditTeacher() {

    const navigate =
        useNavigate();

    const { id } =
        useParams();


    const [formData, setFormData] =
        useState({

            fullName: "",
            username: "",
            email: "",
            mobile: "",
            subject: "",
            qualification: ""

        });


    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // LOAD
    // =====================================================

    useEffect(() => {

        const loadTeacher =
            async () => {

                try {

                    const response =
                        await getTeacherById(id);


                    const teacher =
                        response.data;


                    setFormData({

                        fullName:
                            teacher.fullName || "",

                        username:
                            teacher.username || "",

                        email:
                            teacher.email || "",

                        mobile:
                            teacher.mobile || "",

                        subject:
                            teacher.subject || "",

                        qualification:
                            teacher.qualification || ""

                    });


                } catch (err) {

                    console.error(
                        "Load teacher error:",
                        err
                    );


                    setError(
                        err.response?.data?.message ||
                        "Unable to load teacher."
                    );

                } finally {

                    setLoading(false);

                }
            };


        loadTeacher();

    }, [id]);


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


            try {

                setSaving(true);


                await updateTeacher(
                    id,
                    formData
                );


                alert(
                    "Teacher updated successfully."
                );


                navigate("/teachers");


            } catch (err) {

                console.error(
                    "Update teacher error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    "Unable to update teacher."
                );


            } finally {

                setSaving(false);

            }
        };


    if (loading) {

        return (

            <div className="teacher-form-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading teacher...
                </p>

            </div>
        );
    }


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
                    Edit Teacher
                </h1>

                <p>
                    Update teacher information.
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
                            required
                            disabled={saving}
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
                            required
                            disabled={saving}
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
                            required
                            disabled={saving}
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
                            disabled={saving}
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
                            disabled={saving}
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
                            disabled={saving}
                        />

                    </div>


                    <div className="teacher-form-actions">

                        <button
                            type="button"
                            className="teacher-cancel-btn"
                            onClick={() =>
                                navigate("/teachers")
                            }
                            disabled={saving}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="teacher-submit-btn"
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : "Update Teacher"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}