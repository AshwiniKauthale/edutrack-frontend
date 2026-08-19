import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsSubPages.css";

function ActivityHistory() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("accessToken");

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const token = getToken();

        const response = await fetch(
          "http://localhost:8080/api/settings/activity",
          {
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? { Authorization: `Bearer ${token}` }
                : {}),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load activity history");
        }

        const data = await response.json();

        setActivities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading activity history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown time";

    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="settings-subpage">

      <div className="settings-subpage-header">

        <div>
          <h1>Activity History</h1>

          <p>
            View your recent account activity
          </p>
        </div>

        <button
          className="settings-back-button"
          onClick={() => navigate("/settings")}
        >
          ← Back to Settings
        </button>

      </div>

      <div className="settings-section-card">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            🕘
          </div>

          <div>
            <h2>Recent Activity</h2>

            <p>
              Review recent changes and actions performed
              on your account.
            </p>
          </div>

        </div>

        {loading ? (
          <div className="settings-loading">
            Loading activity history...
          </div>
        ) : activities.length === 0 ? (
          <div className="activity-empty">

            <div className="activity-empty-icon">
              🕘
            </div>

            <h3>No Recent Activity</h3>

            <p>
              Your recent account activities will appear here.
            </p>

          </div>
        ) : (
          <div className="activity-list">

            {activities.map((activity, index) => (
              <div
                className="activity-item"
                key={activity.id || index}
              >

                <div className="activity-icon">
                  {activity.activity === "PASSWORD_CHANGED"
                    ? "🔐"
                    : activity.activity?.includes("SETTINGS")
                    ? "⚙"
                    : "📝"}
                </div>

                <div className="activity-content">

                  <div className="activity-title-row">

                    <h3>
                      {activity.activity || "Activity"}
                    </h3>

                    <span>
                      {formatDate(activity.timestamp)}
                    </span>

                  </div>

                  <p>
                    {activity.description ||
                      "Account activity recorded."}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default ActivityHistory;