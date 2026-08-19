import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getTeacherById
} from "../../api/teacherApi";

import {
    getRole
} from "../../utils/Auth";

import "./TeacherForm.css";


export default function ViewTeacher() {

    const navigate =
        useNavigate();

    const { id } =
        useParams();


    const [teacher, setTeacher] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    const isSuperAdmin =
        getRole() === "SUPER_ADMIN";


    useEffect(() => {

        const load =
            async () => {

                try {

                    const response =
                        await getTeacherById(id);

                    setTeacher(
                        response.data
                    );

                } catch (err) {

                    console.error(
                        "View teacher error:",
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


        load();

    }, [id]);


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


    if (error) {

        return (

            <div className="teacher-form-page">

                <div className="teacher-form-card">

                    <div className="teacher-form-error">
                        ⚠️ {error}
                    </div>

                    <button
                        className="teacher-cancel-btn"
                        onClick={() =>
                            navigate("/teachers")
                        }
                    >
                        Back to Teachers
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="teacher-form-page">

            <div className="teacher-form-card">


                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/teachers")
                    }
                >
                    ← Back to Teachers
                </button>


                <h1>
                    Teacher Details
                </h1>

                <p>
                    View complete teacher information.
                </p>


                <div className="teacher-details-grid">


                    <div>
                        <span>
                            Full Name
                        </span>

                        <strong>
                            {teacher.fullName}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Username
                        </span>

                        <strong>
                            {teacher.username}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Email
                        </span>

                        <strong>
                            {teacher.email}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Mobile
                        </span>

                        <strong>
                            {teacher.mobile ||
                                "Not provided"}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Subject
                        </span>

                        <strong>
                            {teacher.subject ||
                                "Not assigned"}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Qualification
                        </span>

                        <strong>
                            {teacher.qualification ||
                                "Not provided"}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Role
                        </span>

                        <strong>
                            {teacher.role}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Status
                        </span>

                        <strong>
                            {teacher.active
                                ? "Active"
                                : "Inactive"}
                        </strong>
                    </div>

                </div>


                {isSuperAdmin && (

                    <div className="teacher-form-actions">

                        <button
                            className="teacher-submit-btn"
                            onClick={() =>
                                navigate(
                                    `/teachers/edit/${teacher.id}`
                                )
                            }
                        >
                            Edit Teacher
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}