import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getTeachers,
    deleteTeacher,
    activateTeacher,
    deactivateTeacher
} from "../../api/teacherApi";

import {
    getRole
} from "../../utils/Auth";

import "./TeacherList.css";


export default function TeacherList() {

    const navigate = useNavigate();

    const [teachers, setTeachers] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [actionLoading, setActionLoading] =
        useState(null);


    const role = getRole();

    const isSuperAdmin =
        role === "SUPER_ADMIN";


    // =====================================================
    // LOAD
    // =====================================================

    const loadTeachers = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getTeachers();

            setTeachers(
                response.data || []
            );

        } catch (err) {

            console.error(
                "Error loading teachers:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load teachers."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadTeachers();

    }, []);


    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    const filteredTeachers =
        useMemo(() => {

            const value =
                search
                    .toLowerCase()
                    .trim();


            return teachers.filter(
                (teacher) => {

                    const name =
                        (
                            teacher.fullName ||
                            ""
                        )
                        .toLowerCase();

                    const username =
                        (
                            teacher.username ||
                            ""
                        )
                        .toLowerCase();

                    const email =
                        (
                            teacher.email ||
                            ""
                        )
                        .toLowerCase();

                    const subject =
                        (
                            teacher.subject ||
                            ""
                        )
                        .toLowerCase();


                    const matchesSearch =
                        !value ||
                        name.includes(value) ||
                        username.includes(value) ||
                        email.includes(value) ||
                        subject.includes(value);


                    const active =
                        teacher.active === true;


                    const matchesStatus =
                        statusFilter === "ALL" ||
                        (
                            statusFilter === "ACTIVE" &&
                            active
                        ) ||
                        (
                            statusFilter === "INACTIVE" &&
                            !active
                        );


                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            teachers,
            search,
            statusFilter
        ]);


    // =====================================================
    // STATISTICS
    // =====================================================

    const totalTeachers =
        teachers.length;

    const activeTeachers =
        teachers.filter(
            teacher =>
                teacher.active === true
        ).length;

    const inactiveTeachers =
        teachers.filter(
            teacher =>
                teacher.active !== true
        ).length;


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete =
        async (teacher) => {

            if (!isSuperAdmin) {

                alert(
                    "Only Super Admin can delete teachers."
                );

                return;
            }


            const confirmed =
                window.confirm(
                    `Are you sure you want to delete "${teacher.fullName}"?`
                );


            if (!confirmed) {
                return;
            }


            try {

                setActionLoading(
                    teacher.id
                );


                await deleteTeacher(
                    teacher.id
                );


                setTeachers(
                    previous =>
                        previous.filter(
                            item =>
                                item.id !==
                                teacher.id
                        )
                );


            } catch (err) {

                console.error(
                    "Delete teacher error:",
                    err
                );


                alert(
                    err.response?.data?.message ||
                    "Unable to delete teacher."
                );

            } finally {

                setActionLoading(null);

            }
        };


    // =====================================================
    // STATUS
    // =====================================================

    const handleStatus =
        async (teacher) => {

            if (!isSuperAdmin) {

                alert(
                    "Only Super Admin can change teacher status."
                );

                return;
            }


            try {

                setActionLoading(
                    teacher.id
                );


                let response;


                if (teacher.active) {

                    response =
                        await deactivateTeacher(
                            teacher.id
                        );

                } else {

                    response =
                        await activateTeacher(
                            teacher.id
                        );
                }


                setTeachers(
                    previous =>
                        previous.map(
                            item =>
                                item.id ===
                                teacher.id
                                    ? response.data
                                    : item
                        )
                );


            } catch (err) {

                console.error(
                    "Status update error:",
                    err
                );


                alert(
                    err.response?.data?.message ||
                    "Unable to update teacher status."
                );

            } finally {

                setActionLoading(null);

            }
        };


    // =====================================================
    // INITIALS
    // =====================================================

    const getInitials =
        (name) => {

            if (!name) {
                return "T";
            }


            const parts =
                name
                    .trim()
                    .split(/\s+/);


            if (parts.length === 1) {

                return parts[0]
                    .charAt(0)
                    .toUpperCase();
            }


            return (
                parts[0].charAt(0) +
                parts[
                    parts.length - 1
                ].charAt(0)
            ).toUpperCase();
        };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="teachers-page">

                <div className="teachers-loading-page">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading teachers...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="teachers-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="teachers-page-header">

                <div className="teachers-title-section">

                    <div className="teachers-title-icon">
                        👨‍🏫
                    </div>

                    <div>

                        <h1>
                            Teacher Management
                        </h1>

                        <p>
                            Manage your teaching staff,
                            accounts and status.
                        </p>

                    </div>

                </div>


                {isSuperAdmin && (

                    <button
                        className="add-teacher-btn"
                        onClick={() =>
                            navigate(
                                "/teachers/add"
                            )
                        }
                    >

                        <span>
                            +
                        </span>

                        Add Teacher

                    </button>
                )}

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="teacher-error">

                    <span>
                        ⚠️
                    </span>

                    {error}

                    <button
                        onClick={loadTeachers}
                    >
                        Retry
                    </button>

                </div>
            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="teacher-stats">


                <div className="teacher-stat-card">

                    <div className="stat-icon total">
                        👨‍🏫
                    </div>

                    <div className="stat-content">

                        <span>
                            Total Teachers
                        </span>

                        <strong>
                            {totalTeachers}
                        </strong>

                    </div>

                </div>


                <div className="teacher-stat-card">

                    <div className="stat-icon active">
                        ✓
                    </div>

                    <div className="stat-content">

                        <span>
                            Active
                        </span>

                        <strong>
                            {activeTeachers}
                        </strong>

                    </div>

                </div>


                <div className="teacher-stat-card">

                    <div className="stat-icon inactive">
                        ○
                    </div>

                    <div className="stat-content">

                        <span>
                            Inactive
                        </span>

                        <strong>
                            {inactiveTeachers}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div className="teachers-main-card">


                {/* =================================================
                    TOOLBAR
                ================================================= */}

                <div className="teachers-toolbar">


                    <div className="teacher-search-box">

                        <span className="search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search by name, username, email or subject..."
                            value={search}
                            onChange={
                                e =>
                                    setSearch(
                                        e.target.value
                                    )
                            }
                        />


                        {search && (

                            <button
                                type="button"
                                className="clear-search"
                                onClick={() =>
                                    setSearch("")
                                }
                            >
                                ×
                            </button>

                        )}

                    </div>


                    <select
                        value={statusFilter}
                        onChange={
                            e =>
                                setStatusFilter(
                                    e.target.value
                                )
                        }
                    >

                        <option value="ALL">
                            All Teachers
                        </option>

                        <option value="ACTIVE">
                            Active
                        </option>

                        <option value="INACTIVE">
                            Inactive
                        </option>

                    </select>

                </div>


                {/* =================================================
                    RESULT
                ================================================= */}

                <div className="teacher-result-info">

                    Showing{" "}

                    <strong>
                        {filteredTeachers.length}
                    </strong>

                    {" "}of{" "}

                    <strong>
                        {totalTeachers}
                    </strong>

                    {" "}teachers

                </div>


                {/* =================================================
                    TABLE
                ================================================= */}

                {filteredTeachers.length === 0 ? (

                    <div className="empty-teachers">

                        <div className="empty-teacher-icon">
                            👨‍🏫
                        </div>

                        <h2>
                            No teachers found
                        </h2>

                        <p>
                            Try changing your search
                            or filter.
                        </p>

                    </div>

                ) : (

                    <div className="teacher-table-wrapper">

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
                                        Subject
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

                                        <tr
                                            key={
                                                teacher.id
                                            }
                                        >

                                            <td>
                                                {index + 1}
                                            </td>


                                            <td>

                                                <div className="teacher-info">

                                                    <div className="teacher-avatar">

                                                        {getInitials(
                                                            teacher.fullName
                                                        )}

                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {
                                                                teacher.fullName
                                                            }
                                                        </strong>

                                                        <small>
                                                            Teacher
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            <td>
                                                {
                                                    teacher.username
                                                }
                                            </td>


                                            <td>
                                                {
                                                    teacher.email
                                                }
                                            </td>


                                            <td>
                                                {
                                                    teacher.subject ||
                                                    "Not assigned"
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        teacher.active
                                                            ? "status-badge active"
                                                            : "status-badge inactive"
                                                    }
                                                >

                                                    {teacher.active
                                                        ? "Active"
                                                        : "Inactive"}

                                                </span>

                                            </td>


                                            <td>

                                                <div className="teacher-actions">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/teachers/${teacher.id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    {isSuperAdmin && (

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/teachers/edit/${teacher.id}`
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                    )}


                                                    {isSuperAdmin && (

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                actionLoading ===
                                                                teacher.id
                                                            }
                                                            onClick={() =>
                                                                handleStatus(
                                                                    teacher
                                                                )
                                                            }
                                                        >

                                                            {actionLoading ===
                                                            teacher.id
                                                                ? "..."
                                                                : teacher.active
                                                                    ? "Deactivate"
                                                                    : "Activate"}

                                                        </button>

                                                    )}


                                                    {isSuperAdmin && (

                                                        <button
                                                            type="button"
                                                            className="delete-action"
                                                            disabled={
                                                                actionLoading ===
                                                                teacher.id
                                                            }
                                                            onClick={() =>
                                                                handleDelete(
                                                                    teacher
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    )}

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
}