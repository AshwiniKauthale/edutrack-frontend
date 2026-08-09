import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaUserGraduate,
    FaLayerGroup,
    FaChalkboardTeacher,
    FaSchool,
    FaClipboardCheck,
    FaBook,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";

import {
    logout,
    getFullName,
    getRole,
} from "../../utils/Auth";

import "./Sidebar.css";


const menu = [
    {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/dashboard",
    },
    {
        name: "Students",
        icon: <FaUserGraduate />,
        path: "/students",
    },
    {
        name: "Batches",
        icon: <FaLayerGroup />,
        path: "/batches",
    },
    {
        name: "Teachers",
        icon: <FaChalkboardTeacher />,
        path: "/teachers",
    },
    {
        name: "Classrooms",
        icon: <FaSchool />,
        path: "/classrooms",
    },
    {
        name: "Attendance",
        icon: <FaClipboardCheck />,
        path: "/attendance",
    },
    {
        name: "Assignments",
        icon: <FaBook />,
        path: "/assignments",
    },
    {
        name: "Profile",
        icon: <FaUserCircle />,
        path: "/profile",
    },
];


export default function Sidebar({
    open = false,
    onClose = () => {},
}) {

    const fullName =
        getFullName() || "User";

    const role =
        getRole() || "USER";


    const handleLogout = () => {

        const confirmLogout =
            window.confirm(
                "Are you sure you want to logout?"
            );

        if (!confirmLogout) {
            return;
        }

        logout();

        window.location.replace("/");
    };


    return (
        <>

            {/* Mobile overlay */}

            {open && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}


            <aside
                className={`sidebar ${
                    open ? "sidebar-open" : ""
                }`}
            >

                {/* ================= BRAND ================= */}

                <div className="sidebar-brand">

                    <div className="sidebar-brand-icon">
                        E
                    </div>

                    <div>
                        <div className="sidebar-brand-name">
                            EduTrack
                        </div>

                        <div className="sidebar-brand-subtitle">
                            Management Portal
                        </div>
                    </div>

                </div>


                {/* ================= USER ================= */}

                <div className="sidebar-user">

                    <div className="sidebar-user-avatar">
                        {fullName
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div className="sidebar-user-info">

                        <strong>
                            {fullName}
                        </strong>

                        <span>
                            {role}
                        </span>

                    </div>

                </div>


                {/* ================= MENU ================= */}

                <nav className="sidebar-menu">

                    <div className="sidebar-section-title">
                        MENU
                    </div>


                    {menu.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                isActive
                                    ? "menu active"
                                    : "menu"
                            }
                        >

                            <span className="menu-icon">
                                {item.icon}
                            </span>

                            <span className="menu-label">
                                {item.name}
                            </span>

                        </NavLink>

                    ))}

                </nav>


                {/* ================= LOGOUT ================= */}

                <div className="sidebar-bottom">

                    <button
                        className="sidebar-logout"
                        onClick={handleLogout}
                    >

                        <FaSignOutAlt />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>

        </>
    );
}