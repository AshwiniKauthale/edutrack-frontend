import { NavLink, useNavigate } from "react-router-dom";
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

import { logout, getUsername } from "../../utils/Auth";

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

export default function Sidebar() {
  const navigate = useNavigate();

  const username = getUsername() || "Admin";

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logout();

    window.location.replace("/");
  };

  return (
    <div className="sidebar">
      <h2
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        EduTrack
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "25px",
          fontSize: "14px",
        }}
      >
        Welcome, {username}
      </p>

      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "menu active" : "menu"
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}

      <button
        className="logout"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        <span style={{ marginLeft: "8px" }}>
          Logout
        </span>
      </button>
    </div>
  );
}