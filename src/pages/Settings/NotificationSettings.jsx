import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationSettings.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://edutrack-backend-8ior.onrender.com";

function NotificationSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    attendanceNotifications: true,
    assignmentNotifications: true,
    studentNotifications: true,
    systemNotifications: true,
    emailNotifications: false,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const getToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("accessToken");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const token = getToken();

        if (!token) {
          console.error(
            "No authentication token found."
          );
          return;
        }

        const response = await fetch(
          `${API_URL}/api/settings`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load settings (${response.status})`
          );
        }

        const data = await response.json();

        setSettings((previous) => ({
          ...previous,

          attendanceNotifications:
            data.attendanceNotifications ??
            previous.attendanceNotifications,

          assignmentNotifications:
            data.assignmentNotifications ??
            previous.assignmentNotifications,

          studentNotifications:
            data.studentNotifications ??
            previous.studentNotifications,

          systemNotifications:
            data.systemNotifications ??
            previous.systemNotifications,

          emailNotifications:
            data.emailNotifications ??
            previous.emailNotifications,
        }));
      } catch (error) {
        console.error(
          "Error loading notification settings:",
          error
        );
      }
    };

    loadSettings();
  }, []);

  const toggleSetting = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setMessage("");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }

      const response = await fetch(
        `${API_URL}/api/settings`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to save settings (${response.status})`
        );
      }

      setMessage(
        "Notification preferences saved successfully."
      );
    } catch (error) {
      console.error(
        "Error saving notification settings:",
        error
      );

      setMessage(
        "Unable to save notification settings."
      );
    } finally {
      setSaving(false);
    }
  };

  const NotificationItem = ({
    icon,
    title,
    description,
    settingName,
  }) => {
    const enabled = settings[settingName];

    return (
      <div className="notification-setting-item">

        <div className="notification-setting-left">

          <div className="notification-setting-icon">
            {icon}
          </div>

          <div className="notification-setting-info">

            <h3>{title}</h3>

            <p>{description}</p>

          </div>

        </div>

        <button
          type="button"
          className={`notification-toggle ${
            enabled ? "active" : ""
          }`}
          onClick={() =>
            toggleSetting(settingName)
          }
          aria-label={`Toggle ${title}`}
        >
          <span />
        </button>

      </div>
    );
  };

  return (
    <div className="notification-settings-page">

      <div className="notification-settings-header">

        <div className="notification-header-title">

          <div className="notification-header-icon">
            🔔
          </div>

          <div>
            <h1>Notification Settings</h1>

            <p>
              Control how EduTrack keeps you informed
            </p>
          </div>

        </div>

        <button
          type="button"
          className="notification-back-button"
          onClick={() => navigate("/settings")}
        >
          ← Back to Settings
        </button>

      </div>

      <div className="notification-status-card">

        <div className="notification-status-icon">
          🔔
        </div>

        <div className="notification-status-content">

          <h2>Stay up to date</h2>

          <p>
            Choose which activities you want to
            receive notifications about.
          </p>

        </div>

        <div className="notification-status-badge">
          Preferences
        </div>

      </div>

      <div className="notification-settings-container">

        <div className="notification-settings-card">

          <div className="notification-card-header">

            <div className="notification-card-header-icon">
              📱
            </div>

            <div>
              <h2>In-App Notifications</h2>

              <p>
                Notifications that appear inside EduTrack
              </p>
            </div>

          </div>

          <div className="notification-settings-list">

            <NotificationItem
              icon="☑️"
              title="Attendance Updates"
              description="Get notified when attendance records are updated."
              settingName="attendanceNotifications"
            />

            <NotificationItem
              icon="📝"
              title="Assignment Notifications"
              description="Receive reminders about assignments and deadlines."
              settingName="assignmentNotifications"
            />

            <NotificationItem
              icon="👨‍🎓"
              title="Student Notifications"
              description="Get updates related to student activities."
              settingName="studentNotifications"
            />

            <NotificationItem
              icon="⚙️"
              title="System Notifications"
              description="Receive important system and application updates."
              settingName="systemNotifications"
            />

          </div>

        </div>

        <div className="notification-settings-card">

          <div className="notification-card-header">

            <div className="notification-card-header-icon">
              ✉️
            </div>

            <div>
              <h2>Email Notifications</h2>

              <p>
                Receive important updates directly in
                your inbox
              </p>
            </div>

          </div>

          <div className="notification-settings-list">

            <NotificationItem
              icon="📧"
              title="Email Notifications"
              description="Receive important EduTrack updates by email."
              settingName="emailNotifications"
            />

          </div>

        </div>

        <div className="notification-save-area">

          {message && (
            <span
              className={
                message.includes("successfully")
                  ? "notification-success"
                  : "notification-error"
              }
            >
              {message}
            </span>
          )}

          <button
            type="button"
            className="notification-save-button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Preferences"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default NotificationSettings;