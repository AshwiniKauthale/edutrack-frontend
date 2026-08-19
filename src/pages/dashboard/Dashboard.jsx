import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { getDashboardStats } from "../../api/dashboardApi";
function Dashboard() {
    const navigate = useNavigate();

    // =====================================================
    // CURRENT USER
    // =====================================================

    const [currentUser, setCurrentUser] = useState({
        fullName: "",
        username: "",
        role: "",
    });

    // =====================================================
    // REFRESH STATE
    // =====================================================

    const [refreshing, setRefreshing] = useState(false);

    // =====================================================
    // DASHBOARD DATA
    // =====================================================

    const [attendancePercentage, setAttendancePercentage] = useState(0);
    const [attendancePresent, setAttendancePresent] = useState(0);
    const [attendanceAbsent, setAttendanceAbsent] = useState(0);
    const [attendanceRecords, setAttendanceRecords] = useState(0);

    const [academicSummary, setAcademicSummary] = useState({
        students: 0,
        teachers: 0,
        batches: 0,
        assignments: 0,
    });

    // =====================================================
    // LOAD CURRENT USER
    // =====================================================

    useEffect(() => {
        loadCurrentUser();
        loadDashboardData();
    }, []);

    // =====================================================
    // CURRENT USER
    // =====================================================

    const loadCurrentUser = () => {
        try {
            const possibleKeys = [
                "user",
                "currentUser",
                "authUser",
                "loggedInUser",
            ];

            let storedUser = null;

            for (const key of possibleKeys) {
                const data = localStorage.getItem(key);

                if (data) {
                    try {
                        storedUser = JSON.parse(data);
                        break;
                    } catch {
                        // Continue
                    }
                }
            }

            if (storedUser) {
                setCurrentUser({
                    fullName:
                        storedUser.fullName ||
                        storedUser.name ||
                        "",
                    username:
                        storedUser.username ||
                        storedUser.userName ||
                        "",
                    role:
                        storedUser.role ||
                        "",
                });
            }

            const username = localStorage.getItem("username");
            const role = localStorage.getItem("role");
            const fullName = localStorage.getItem("fullName");

            if (username || role || fullName) {
                setCurrentUser((previous) => ({
                    fullName:
                        fullName ||
                        previous.fullName ||
                        "",
                    username:
                        username ||
                        previous.username ||
                        "",
                    role:
                        role ||
                        previous.role ||
                        "",
                }));
            }
        } catch (error) {
            console.error(
                "Error loading current user:",
                error
            );
        }
    };

    // =====================================================
    // LOAD DASHBOARD DATA
    // =====================================================

    const loadDashboardData = async () => {

    try {

        const response =
            await getDashboardStats();

        console.log(
            "================================="
        );

        console.log(
            "DASHBOARD API RESPONSE:"
        );

        console.log(
            response.data
        );

        console.log(
            "================================="
        );

        const data = response.data;

        // =====================================================
        // ACADEMIC SUMMARY
        // =====================================================

        setAcademicSummary({
            students:
                Number(data.totalStudents ?? 0),

            teachers:
                Number(data.totalTeachers ?? 0),

            batches:
                Number(data.totalBatches ?? 0),

            assignments:
                Number(data.totalAssignments ?? 0),
        });

        // =====================================================
        // ATTENDANCE
        // =====================================================

        setAttendancePercentage(
            Number(
                data.attendancePercentage ?? 0
            )
        );

        setAttendancePresent(
            Number(
                data.presentCount ?? 0
            )
        );

        setAttendanceAbsent(
            Number(
                data.absentCount ?? 0
            )
        );

        setAttendanceRecords(
            Number(
                data.totalAttendance ?? 0
            )
        );

    } catch (error) {

        console.error(
            "================================="
        );

        console.error(
            "DASHBOARD API ERROR"
        );

        console.error(
            error
        );

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Response:",
            error.response?.data
        );

        console.error(
            "================================="
        );
    }
};

    // =====================================================
    // REFRESH
    // =====================================================

    const handleRefresh = async () => {
        if (refreshing) {
            return;
        }

        setRefreshing(true);

        try {
            await loadDashboardData();
        } finally {
            setRefreshing(false);
        }
    };

    // =====================================================
    // DISPLAY USER
    // =====================================================

    const displayName =
        currentUser.fullName ||
        currentUser.username ||
        "User";

    const displayRole =
        currentUser.role || "USER";

    const avatarLetter =
        displayName.charAt(0).toUpperCase();

    // =====================================================
    // DASHBOARD CARDS
    // =====================================================

    const cards = [
        {
            title: "Students",
            icon: "♟",
            color: "blue",
            path: "/students",
        },
        {
            title: "Teachers",
            icon: "▣",
            color: "green",
            path: "/teachers",
        },
        {
            title: "Batches",
            icon: "▰",
            color: "blue",
            path: "/batches",
        },
        {
            title: "Classrooms",
            icon: "▥",
            color: "green",
            path: "/classrooms",
        },
        {
            title: "Attendance",
            icon: "☑",
            color: "blue",
            path: "/attendance",
        },
        {
            title: "Assignments",
            icon: "▤",
            color: "green",
            path: "/assignments",
        },
    ];

    // =====================================================
    // QUICK ACTIONS
    // =====================================================

    const quickActions = [
        {
            title: "Add Student",
            icon: "♟",
            path: "/students/add",
        },
        {
            title: "Add Teacher",
            icon: "▣",
            path: "/teachers",
        },
        {
            title: "Add Batch",
            icon: "+",
            path: "/batches",
        },
        {
            title: "Add Classroom",
            icon: "+",
            path: "/classrooms",
        },
    ];

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="dashboard-page">

            {/* =================================================
                TOP HEADER
            ================================================= */}

            <header className="dashboard-header">

                <div className="dashboard-header-left">
                    <div className="header-brand">
                        EduTrack
                    </div>
                </div>

                <div className="header-right">

                    {/* Notification */}

                    <button
                        type="button"
                        className="notification-button"
                        onClick={() =>
                            navigate("/notifications")
                        }
                        title="Notifications"
                    >
                        🔔
                    </button>

                    {/* User */}

                    <div
                        className="header-user"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >

                        <div className="header-avatar">
                            {avatarLetter}
                        </div>

                        <div className="header-user-info">

                            <strong>
                                {displayName}
                            </strong>

                            <span>
                                {displayRole}
                            </span>

                        </div>

                        <span className="header-arrow">
                            ▾
                        </span>

                    </div>

                </div>

            </header>

            {/* =================================================
                DASHBOARD CONTENT
            ================================================= */}

            <div className="dashboard-content">

                {/* =================================================
                    TITLE
                ================================================= */}

                <div className="dashboard-title">

                    <h1>
                        Welcome to EduTrack
                    </h1>

                    <p>
                        Classroom &amp; Student Management Portal
                    </p>

                </div>

                {/* =================================================
                    MAIN CARDS
                ================================================= */}

                <div className="dashboard-cards">

                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className={`dashboard-card ${card.color}`}
                            onClick={() =>
                                navigate(card.path)
                            }
                        >

                            <div className="card-icon">
                                {card.icon}
                            </div>

                            <h2>
                                {card.title}
                            </h2>

                            <div className="card-arrow">
                                →
                            </div>

                        </div>
                    ))}

                </div>

                {/* =================================================
                    ATTENDANCE OVERVIEW
                ================================================= */}

                <section className="dashboard-section attendance-overview-section">

                    <div className="section-header">

                        <div>
                            <h2>
                                Attendance Overview
                            </h2>

                            <p>
                                Current attendance summary
                            </p>
                        </div>

                        <button
                            type="button"
                            className={`dashboard-refresh-button ${
                                refreshing
                                    ? "refreshing"
                                    : ""
                            }`}
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >

                            <span className="refresh-icon">
                                ↻
                            </span>

                            <span>
                                {refreshing
                                    ? "Refreshing..."
                                    : "Refresh"}
                            </span>

                        </button>

                    </div>

                    {/* =================================================
                        NEW ATTENDANCE CARD
                    ================================================= */}

                    <div className="attendance-modern-card">

                        {/* TOP */}

                        <div className="attendance-modern-top">

                            <div className="attendance-score">

                                <div className="attendance-score-number">
                                    {attendancePercentage}%
                                </div>

                                <div className="attendance-score-label">
                                    Overall Attendance
                                </div>

                            </div>

                            <div className="attendance-summary-text">

                                <h3>
                                    Attendance Performance
                                </h3>

                                <p>
                                    Your current attendance
                                    performance based on
                                    available records.
                                </p>

                                <button
                                    type="button"
                                    className="attendance-view-button"
                                    onClick={() =>
                                        navigate("/attendance")
                                    }
                                >
                                    View Attendance
                                    <span>→</span>
                                </button>

                            </div>

                        </div>

                        {/* PROGRESS */}

                        <div className="attendance-progress-wrapper">

                            <div className="attendance-progress-header">

                                <span>
                                    Attendance Progress
                                </span>

                                <strong>
                                    {attendancePercentage}%
                                </strong>

                            </div>

                            <div className="attendance-progress">

                                <div
                                    className="attendance-progress-fill"
                                    style={{
                                        width:
                                            `${attendancePercentage}%`,
                                    }}
                                />

                            </div>

                        </div>

                        {/* STATISTICS */}

                        <div className="attendance-modern-stats">

                            <div className="attendance-modern-stat present">

                                <div className="modern-stat-icon">
                                    ✓
                                </div>

                                <div>
                                    <span>
                                        Present
                                    </span>

                                    <strong>
                                        {attendancePresent}
                                    </strong>
                                </div>

                            </div>

                            <div className="attendance-modern-stat absent">

                                <div className="modern-stat-icon">
                                    !
                                </div>

                                <div>
                                    <span>
                                        Absent
                                    </span>

                                    <strong>
                                        {attendanceAbsent}
                                    </strong>
                                </div>

                            </div>

                            <div className="attendance-modern-stat records">

                                <div className="modern-stat-icon">
                                    #
                                </div>

                                <div>
                                    <span>
                                        Total Records
                                    </span>

                                    <strong>
                                        {attendanceRecords}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                    ACADEMIC SUMMARY
                ================================================= */}

                <section className="dashboard-section academic-summary-section">

                    <div className="section-header">

                        <div>
                            <h2>
                                Academic Summary
                            </h2>

                            <p>
                                Current system overview
                            </p>
                        </div>

                    </div>

                    <div className="academic-summary-grid">

                        <div
                            className="academic-summary-card"
                            onClick={() =>
                                navigate("/students")
                            }
                        >

                            <div className="academic-summary-icon blue">
                                ♟
                            </div>

                            <div>
                                <span>
                                    Total Students
                                </span>

                                <strong>
                                    {academicSummary.students}
                                </strong>
                            </div>

                        </div>

                        <div
                            className="academic-summary-card"
                            onClick={() =>
                                navigate("/teachers")
                            }
                        >

                            <div className="academic-summary-icon green">
                                ▣
                            </div>

                            <div>
                                <span>
                                    Total Teachers
                                </span>

                                <strong>
                                    {academicSummary.teachers}
                                </strong>
                            </div>

                        </div>

                        <div
                            className="academic-summary-card"
                            onClick={() =>
                                navigate("/batches")
                            }
                        >

                            <div className="academic-summary-icon blue">
                                ▰
                            </div>

                            <div>
                                <span>
                                    Total Batches
                                </span>

                                <strong>
                                    {academicSummary.batches}
                                </strong>
                            </div>

                        </div>

                        <div
                            className="academic-summary-card"
                            onClick={() =>
                                navigate("/assignments")
                            }
                        >

                            <div className="academic-summary-icon green">
                                ▤
                            </div>

                            <div>
                                <span>
                                    Assignments
                                </span>

                                <strong>
                                    {academicSummary.assignments}
                                </strong>
                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                    RECENT ACTIVITY + UPCOMING EVENTS
                ================================================= */}

                <div className="dashboard-bottom-grid">

                    {/* RECENT ACTIVITY */}

                    <section className="dashboard-section">

                        <div className="section-header">

                            <div>
                                <h2>
                                    Recent Activity
                                </h2>

                                <p>
                                    Latest activities
                                </p>
                            </div>

                        </div>

                        <div className="dashboard-empty-state">

                            <div className="dashboard-empty-icon">
                                🕘
                            </div>

                            <h3>
                                No recent activity
                            </h3>

                            <p>
                                Recent system activities
                                will appear here.
                            </p>

                        </div>

                    </section>

                    {/* UPCOMING EVENTS */}

                    <section className="dashboard-section">

                        <div className="section-header">

                            <div>
                                <h2>
                                    Upcoming Events
                                </h2>

                                <p>
                                    Important upcoming activities
                                </p>
                            </div>

                        </div>

                        <div className="dashboard-empty-state">

                            <div className="dashboard-empty-icon">
                                📅
                            </div>

                            <h3>
                                No upcoming events
                            </h3>

                            <p>
                                Upcoming events will appear here.
                            </p>

                        </div>

                    </section>

                </div>

                {/* =================================================
                    QUICK ACTIONS
                ================================================= */}

                <section className="quick-actions">

                    <div className="quick-header">

                        <h2>
                            Quick Actions
                        </h2>

                        <span>
                            Frequently used
                        </span>

                    </div>

                    <div className="quick-grid">

                        {quickActions.map((action) => (

                            <button
                                key={action.title}
                                className="quick-action"
                                onClick={() =>
                                    navigate(action.path)
                                }
                                type="button"
                            >

                                <div className="quick-icon">
                                    {action.icon}
                                </div>

                                <span>
                                    {action.title}
                                </span>

                                <span className="quick-arrow">
                                    →
                                </span>

                            </button>

                        ))}

                    </div>

                </section>

            </div>

        </div>
    );
}

export default Dashboard;