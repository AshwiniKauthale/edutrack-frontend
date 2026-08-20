import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Teachers.css";

const API = import.meta.env.VITE_API_URL;

const Teachers = () => {
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // FETCH TEACHERS
    // =====================================================

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API}/api/superadmin/teachers`
            );

            setTeachers(response.data || []);

        } catch (err) {
            console.error("Error loading teachers:", err);

            setError(
                err.response?.data ||
                "Unable to load teachers"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    // =====================================================
    // STATISTICS
    // =====================================================

    const totalTeachers = teachers.length;

    const activeTeachers = teachers.filter(
        (teacher) => teacher.active === true
    ).length;

    const inactiveTeachers = teachers.filter(
        (teacher) => teacher.active === false
    ).length;

    // =====================================================
    // FILTER TEACHERS
    // =====================================================

    const filteredTeachers = useMemo(() => {
        return teachers.filter((teacher) => {

            const searchText = search.toLowerCase();

            const matchesSearch =
                (teacher.fullName || "")
                    .toLowerCase()
                    .includes(searchText) ||

                (teacher.username || "")
                    .toLowerCase()
                    .includes(searchText) ||

                (teacher.email || "")
                    .toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && teacher.active === true) ||
                (statusFilter === "INACTIVE" && teacher.active === false);

            return matchesSearch && matchesStatus;
        });
    }, [teachers, search, statusFilter]);

    // =====================================================
    // DELETE TEACHER
    // =====================================================

    const handleDelete = async (teacher) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${teacher.fullName}?`
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(
                `${API}/api/superadmin/teachers/${teacher.id}`
            );

            alert("Teacher deleted successfully");

            fetchTeachers();

        } catch (err) {

            console.error("Delete teacher error:", err);

            alert(
                err.response?.data ||
                "Unable to delete teacher"
            );
        }
    };

    // =====================================================
    // VIEW TEACHER
    // =====================================================

    const handleView = (teacher) => {

        navigate(`/teachers/${teacher.id}`);
    };

    // =====================================================
    // EDIT TEACHER
    // =====================================================

    const handleEdit = (teacher) => {

        navigate(`/teachers/edit/${teacher.id}`);
    };

    // =====================================================
    // INITIALS
    // =====================================================

    const getInitials = (name) => {

        if (!name) {
            return "T";
        }

        const words = name.trim().split(" ");

        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="teachers-page">

                <div className="teachers-loading">

                    <div className="loading-spinner"></div>

                    <p>Loading teachers...</p>

                </div>

            </div>
        );
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div className="teachers-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="teachers-header">

                <div>

                    <div className="page-title-row">

                        <div className="page-icon">
                            👩‍🏫
                        </div>

                        <div>

                            <h1>
                                Teachers
                            </h1>

                            <p>
                                Manage and organize your teaching staff
                            </p>

                        </div>

                    </div>

                </div>

                <button
                    className="add-teacher-btn"
                    onClick={() => navigate("/create-teacher")}
                >
                    <span>+</span>
                    Add Teacher
                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="teacher-error">

                    ⚠️ {error}

                </div>

            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="teacher-stats">

                {/* TOTAL */}

                <div className="stat-card">

                    <div className="stat-icon total-icon">
                        👥
                    </div>

                    <div className="stat-content">

                        <span className="stat-label">
                            Total Teachers
                        </span>

                        <strong className="stat-number">
                            {totalTeachers}
                        </strong>

                        <span className="stat-description">
                            Teaching staff
                        </span>

                    </div>

                </div>


                {/* ACTIVE */}

                <div className="stat-card">

                    <div className="stat-icon active-icon">
                        ✓
                    </div>

                    <div className="stat-content">

                        <span className="stat-label">
                            Active
                        </span>

                        <strong className="stat-number">
                            {activeTeachers}
                        </strong>

                        <span className="stat-description">
                            Currently active
                        </span>

                    </div>

                </div>


                {/* INACTIVE */}

                <div className="stat-card">

                    <div className="stat-icon inactive-icon">
                        ○
                    </div>

                    <div className="stat-content">

                        <span className="stat-label">
                            Inactive
                        </span>

                        <strong className="stat-number">
                            {inactiveTeachers}
                        </strong>

                        <span className="stat-description">
                            Currently inactive
                        </span>

                    </div>

                </div>

            </div>


            {/* =================================================
                TEACHERS CONTAINER
            ================================================= */}

            <div className="teachers-container">

                {/* TOOLBAR */}

                <div className="teachers-toolbar">

                    <div className="search-box">

                        <span className="search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search teachers by name, username or email..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        {search && (

                            <button
                                className="clear-search"
                                onClick={() => setSearch("")}
                            >
                                ×
                            </button>

                        )}

                    </div>


                    <select
                        className="status-filter"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >

                        <option value="ALL">
                            All Teachers
                        </option>

                        <option value="ACTIVE">
                            Active Teachers
                        </option>

                        <option value="INACTIVE">
                            Inactive Teachers
                        </option>

                    </select>

                </div>


                {/* RESULTS INFO */}

                <div className="results-info">

                    <div>

                        Showing{" "}
                        <strong>
                            {filteredTeachers.length}
                        </strong>{" "}
                        of{" "}
                        <strong>
                            {totalTeachers}
                        </strong>{" "}
                        teachers

                    </div>

                    {(search || statusFilter !== "ALL") && (

                        <button
                            className="reset-filter"
                            onClick={() => {
                                setSearch("");
                                setStatusFilter("ALL");
                            }}
                        >
                            Reset filters
                        </button>

                    )}

                </div>


                {/* =================================================
                    TABLE
                ================================================= */}

                {filteredTeachers.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            👩‍🏫
                        </div>

                        <h3>
                            No teachers found
                        </h3>

                        <p>
                            Try changing your search or filter.
                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table className="teachers-table">

                            <thead>

                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Teacher
                                    </th>

                                    <th>
                                        Username
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredTeachers.map(
                                    (teacher, index) => (

                                        <tr key={teacher.id || index}>

                                            {/* NUMBER */}

                                            <td className="number-cell">
                                                {index + 1}
                                            </td>


                                            {/* TEACHER */}

                                            <td>

                                                <div className="teacher-info">

                                                    <div className="teacher-avatar">

                                                        {getInitials(
                                                            teacher.fullName
                                                        )}

                                                    </div>

                                                    <div>

                                                        <div className="teacher-name">

                                                            {teacher.fullName ||
                                                                "Unknown Teacher"}

                                                        </div>

                                                        <div className="teacher-subtitle">

                                                            Teaching Staff

                                                        </div>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* USERNAME */}

                                            <td>

                                                <span className="username">

                                                    @{teacher.username}

                                                </span>

                                            </td>


                                            {/* EMAIL */}

                                            <td>

                                                <span className="email">

                                                    {teacher.email}

                                                </span>

                                            </td>


                                            {/* ROLE */}

                                            <td>

                                                <span className="role-badge">

                                                    {teacher.role ||
                                                        "TEACHER"}

                                                </span>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                {teacher.active ? (

                                                    <span className="status-badge active">

                                                        <span className="status-dot"></span>

                                                        Active

                                                    </span>

                                                ) : (

                                                    <span className="status-badge inactive">

                                                        <span className="status-dot"></span>

                                                        Inactive

                                                    </span>

                                                )}

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="action-btn view-btn"
                                                        title="View Teacher"
                                                        onClick={() =>
                                                            handleView(
                                                                teacher
                                                            )
                                                        }
                                                    >
                                                        👁
                                                    </button>

                                                    <button
                                                        className="action-btn edit-btn"
                                                        title="Edit Teacher"
                                                        onClick={() =>
                                                            handleEdit(
                                                                teacher
                                                            )
                                                        }
                                                    >
                                                        ✏️
                                                    </button>

                                                    <button
                                                        className="action-btn delete-btn"
                                                        title="Delete Teacher"
                                                        onClick={() =>
                                                            handleDelete(
                                                                teacher
                                                            )
                                                        }
                                                    >
                                                        🗑
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Teachers;