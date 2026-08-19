import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getFullName,
    getEmail,
    getRole,
    logout,
} from "../../utils/Auth";

import "./Navbar.css";

export default function Navbar({ onMenuClick }) {

    const navigate = useNavigate();

    const [profileOpen, setProfileOpen] = useState(false);

    const fullName = getFullName() || "User";
    const email = getEmail() || "";
    const role = getRole() || "USER";

    const avatarLetter =
        fullName.charAt(0).toUpperCase();


    const handleLogout = () => {

        logout();

        navigate("/", {
            replace: true,
        });
    };


    const handleProfile = () => {

        setProfileOpen(false);

        navigate("/profile");
    };


    return (
        <header className="top-navbar">

            {/* ================= LEFT ================= */}

            <div className="navbar-left">

                <button
                    className="menu-button"
                    onClick={onMenuClick}
                    aria-label="Toggle sidebar"
                >
                    ☰
                </button>


                <button
                    className="navbar-brand"
                    onClick={() => navigate("/dashboard")}
                >

                    <span className="brand-icon">
                        E
                    </span>

                    <span className="brand-name">
                        EduTrack
                    </span>

                </button>

            </div>


            {/* ================= RIGHT ================= */}

            <div className="navbar-right">

                <button
                    className="notification-button"
                    title="Notifications"
                >
                    🔔
                </button>


                <div className="profile-container">

                    <button
                        className="profile-button"
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                    >

                        <div className="profile-avatar">
                            {avatarLetter}
                        </div>


                        <div className="profile-info">

                            <span className="profile-name">
                                {fullName}
                            </span>

                            <span className="profile-role">
                                {role}
                            </span>

                        </div>


                        <span className="profile-arrow">
                            {profileOpen ? "▲" : "▼"}
                        </span>

                    </button>


                    {/* ================= DROPDOWN ================= */}

                    {profileOpen && (

                        <div className="profile-dropdown">

                            <div className="dropdown-user">

                                <div className="dropdown-avatar">
                                    {avatarLetter}
                                </div>


                                <div className="dropdown-user-info">

                                    <strong>
                                        {fullName}
                                    </strong>

                                    {email && (
                                        <span>
                                            {email}
                                        </span>
                                    )}

                                    <small>
                                        {role}
                                    </small>

                                </div>

                            </div>


                            <div className="dropdown-divider" />


                            <button
                                className="dropdown-item"
                                onClick={handleProfile}
                            >
                                <span>
                                    👤
                                </span>

                                <span>
                                    My Profile
                                </span>
                            </button>


                            <button
                                className="dropdown-item logout-item"
                                onClick={handleLogout}
                            >
                                <span>
                                    🚪
                                </span>

                                <span>
                                    Logout
                                </span>
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}