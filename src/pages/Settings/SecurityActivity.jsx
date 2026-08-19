import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SecurityActivity.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

function SecurityActivity() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("jwtToken") ||
      localStorage.getItem("accessToken") ||
      ""
    );
  };

  // =====================================================
  // LOAD ACTIVITY
  // =====================================================

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Your session has expired. Please login again.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/settings/activity`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load security activity (${response.status})`
        );
      }

      const data = await response.json();

      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Security activity error:", err);
      setError("Unable to load security activity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "Unknown";
    }

    try {
      return new Date(timestamp).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  // =====================================================
  // ACTIVITY ICON
  // =====================================================

  const getActivityIcon = (activity = "") => {
    const value = activity.toUpperCase();

    if (value.includes("PASSWORD")) {
      return "🔐";
    }

    if (value.includes("LOGIN")) {
      return "🔑";
    }

    if (value.includes("LOGOUT")) {
      return "↪";
    }

    if (value.includes("SETTING")) {
      return "⚙";
    }

    if (value.includes("ORGANIZATION")) {
      return "🏢";
    }

    if (value.includes("ACADEMIC")) {
      return "🎓";
    }

    return "✓";
  };

  // =====================================================
  // ACTIVITY TITLE
  // =====================================================

  const getActivityTitle = (activity = "") => {
    return activity
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <div className="security-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="security-header">

        <div>
          <div className="security-breadcrumb">
            Settings / Security
          </div>

          <h1>Security & Activity</h1>

          <p>
            Review your account security and recent activities.
          </p>
        </div>

        <button
          type="button"
          className="security-back-button"
          onClick={() => navigate("/settings")}
        >
          ← Back to Settings
        </button>

      </div>

      {/* =================================================
          SECURITY CARDS
      ================================================= */}

      <div className="security-cards">

        <div className="security-card">

          <div className="security-card-icon">
            🔐
          </div>

          <div>
            <span>Account Security</span>
            <strong>Protected</strong>
          </div>

          <div className="security-status">
            ●
          </div>

        </div>

        <div className="security-card">

          <div className="security-card-icon">
            🕒
          </div>

          <div>
            <span>Activity History</span>
            <strong>{activities.length} Records</strong>
          </div>

        </div>

        <div className="security-card">

          <div className="security-card-icon">
            👤
          </div>

          <div>
            <span>Current Session</span>
            <strong>Active</strong>
          </div>

          <div className="active-dot">
            ●
          </div>

        </div>

      </div>

      {/* =================================================
          SECURITY ACTIONS
      ================================================= */}

      <section className="security-actions-section">

        <div className="section-heading">
          <div>
            <h2>Security Actions</h2>
            <p>Manage your account security.</p>
          </div>
        </div>

        <div className="security-actions">

          <button
            type="button"
            onClick={() =>
              navigate("/profile/change-password")
            }
          >
            <span className="action-icon">🔐</span>

            <span className="action-content">
              <strong>Change Password</strong>
              <small>
                Update your account password
              </small>
            </span>

            <span className="action-arrow">
              →
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
          >
            <span className="action-icon">👤</span>

            <span className="action-content">
              <strong>Account Profile</strong>
              <small>
                View your account information
              </small>
            </span>

            <span className="action-arrow">
              →
            </span>
          </button>

        </div>

      </section>

      {/* =================================================
          ACTIVITY HISTORY
      ================================================= */}

      <section className="activity-section">

        <div className="activity-heading">

          <div>
            <h2>Recent Activity</h2>
            <p>
              Your latest account and settings activities.
            </p>
          </div>

          <button
            type="button"
            onClick={loadActivities}
          >
            ↻ Refresh
          </button>

        </div>

        {loading && (
          <div className="activity-state">
            <div className="loading-spinner"></div>
            <p>Loading activity...</p>
          </div>
        )}

        {!loading && error && (
          <div className="activity-error">
            <span>⚠</span>
            <p>{error}</p>

            <button
              type="button"
              onClick={loadActivities}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          activities.length === 0 && (
            <div className="activity-empty">

              <div className="empty-icon">
                ✓
              </div>

              <h3>No recent activity</h3>

              <p>
                Your account activity will appear here.
              </p>

            </div>
          )}

        {!loading &&
          !error &&
          activities.length > 0 && (
            <div className="activity-list">

              {activities.map((item, index) => (

                <div
                  className="activity-item"
                  key={item.id || index}
                >

                  <div className="activity-icon">
                    {getActivityIcon(item.activity)}
                  </div>

                  <div className="activity-details">

                    <div className="activity-title-row">

                      <h3>
                        {getActivityTitle(
                          item.activity
                        )}
                      </h3>

                      <span>
                        {formatDate(item.timestamp)}
                      </span>

                    </div>

                    <p>
                      {item.description ||
                        "Account activity recorded."}
                    </p>

                  </div>

                </div>

              ))}

            </div>
          )}

      </section>

    </div>
  );
}

export default SecurityActivity;