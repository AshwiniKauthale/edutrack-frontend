import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { getFullName } from "../../utils/Auth";

import "./Dashboard.css";

import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaLayerGroup,
    FaSchool,
    FaClipboardCheck,
    FaBook,
    FaUserPlus,
    FaChalkboard,
    FaPlus,
} from "react-icons/fa";

const dashboardItems = [
    {
        title: "Students",
        icon: <FaUserGraduate />,
        path: "/students",
        color: "blue",
    },
    {
        title: "Teachers",
        icon: <FaChalkboardTeacher />,
        path: "/teachers",
        color: "teal",
    },
    {
        title: "Batches",
        icon: <FaLayerGroup />,
        path: "/batches",
        color: "blue",
    },
    {
        title: "Classrooms",
        icon: <FaSchool />,
        path: "/classrooms",
        color: "teal",
    },
    {
        title: "Attendance",
        icon: <FaClipboardCheck />,
        path: "/attendance",
        color: "blue",
    },
    {
        title: "Assignments",
        icon: <FaBook />,
        path: "/assignments",
        color: "teal",
    },
];

const quickActions = [
    {
        title: "Add Student",
        icon: <FaUserPlus />,
        path: "/students/add",
    },
    {
        title: "Add Teacher",
        icon: <FaChalkboard />,
        path: "/teachers/add",
    },
    {
        title: "Add Batch",
        icon: <FaPlus />,
        path: "/batches/add",
    },
    {
        title: "Add Classroom",
        icon: <FaPlus />,
        path: "/classrooms/add",
    },
];

export default function Dashboard() {

    const navigate = useNavigate();

    const fullName = getFullName() || "User";

    return (
        <MainLayout>

            <div className="dashboard-page">

                {/* ================= HEADER ================= */}

                <div className="dashboard-header">

                    <div>
                        <h1>EduTrack</h1>

                        <p>
                            Classroom & Student Management Portal
                        </p>
                    </div>

                </div>


                {/* ================= MAIN DASHBOARD ================= */}

                <div className="dashboard-grid">

                    {dashboardItems.map((item) => (

                        <button
                            key={item.path}
                            className={`dashboard-card ${item.color}`}
                            onClick={() => navigate(item.path)}
                        >

                            <div className="dashboard-card-icon">
                                {item.icon}
                            </div>

                            <span className="dashboard-card-title">
                                {item.title}
                            </span>

                            <span className="dashboard-card-arrow">
                                →
                            </span>

                        </button>

                    ))}

                </div>


                {/* ================= QUICK ACTIONS ================= */}

                <div className="quick-actions">

                    <div className="quick-actions-header">
                        <h2>Quick Actions</h2>

                        <span>
                            Frequently used
                        </span>
                    </div>


                    <div className="quick-actions-grid">

                        {quickActions.map((action) => (

                            <button
                                key={action.path}
                                className="quick-action-button"
                                onClick={() => navigate(action.path)}
                            >

                                <span className="quick-action-icon">
                                    {action.icon}
                                </span>

                                <span>
                                    {action.title}
                                </span>

                                <span className="quick-action-arrow">
                                    →
                                </span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* ================= FOOTER ================= */}

                <div className="dashboard-footer">

                    <span>
                        Logged in as
                    </span>

                    <strong>
                        {fullName}
                    </strong>

                </div>

            </div>

        </MainLayout>
    );
}