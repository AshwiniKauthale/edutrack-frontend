import { NavLink, useNavigate } from "react-router-dom";
import { getRole, logout } from "../../utils/Auth";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  // Keep role for menu permissions
  // but do NOT display it in the sidebar.
  const role = getRole();

  const managementRoles = [
    "SUPER_ADMIN",
    "TEACHER"
  ];

  // =====================================================
  // MENU ITEMS
  // =====================================================

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
      roles: [
        "SUPER_ADMIN",
        "TEACHER",
        "STUDENT"
      ]
    },

    {
      name: "Students",
      path: "/students",
      icon: "♟",
      roles: managementRoles
    },

    {
      name: "Batches",
      path: "/batches",
      icon: "▰",
      roles: managementRoles
    },

    {
      name: "Teachers",
      path: "/teachers",
      icon: "▣",
      roles: managementRoles
    },

    {
      name: "Classrooms",
      path: "/classrooms",
      icon: "▥",
      roles: managementRoles
    },

    {
      name: "Attendance",
      path: "/attendance",
      icon: "☑",
      roles: managementRoles
    },

    {
      name: "Assignments",
      path: "/assignments",
      icon: "▤",
      roles: managementRoles
    },

    {
      name: "Create Teacher",
      path: "/teachers/add",
      icon: "👨‍🏫",
      roles: [
        "SUPER_ADMIN"
      ]
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "●",
      roles: [
        "SUPER_ADMIN",
        "TEACHER",
        "STUDENT"
      ]
    },

    {
      name: "Settings",
      path: "/settings",
      icon: "⚙",
      roles: ["SUPER_ADMIN", "TEACHER", "STUDENT"]
    }
  ];

  // =====================================================
  // FILTER MENU ACCORDING TO ROLE
  // =====================================================

  const visibleItems = menuItems.filter(
    (item) => item.roles.includes(role)
  );

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true
    });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <aside className="sidebar">

      {/* =================================================
          BRAND
      ================================================= */}

      <div className="sidebar-brand">

        <div className="brand-logo">
          E
        </div>

        <div className="brand-text">

          <h1>
            EduTrack
          </h1>

          <p>
            Management Portal
          </p>

        </div>

      </div>


      {/* =================================================
          DIVIDER
      ================================================= */}

      <div className="sidebar-divider"></div>


      {/* =================================================
          MENU TITLE
          
          USERNAME / ROLE REMOVED FROM HERE
      ================================================= */}

      <div className="menu-title">
        MENU
      </div>


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="sidebar-menu">

        {visibleItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span className="sidebar-link-text">
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* =================================================
          LOGOUT
      ================================================= */}

      <div className="sidebar-bottom">

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >

          <span className="logout-icon">
            ↪
          </span>

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;