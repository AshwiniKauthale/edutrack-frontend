import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsSubPages.css";

function SecuritySettings() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      setError("Please fill in all password fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("New password must contain at least 6 characters.");
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      const response = await fetch(
        "http://localhost:8080/api/settings/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? { Authorization: `Bearer ${token}` }
              : {}),
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || "Failed to change password");
      }

      setMessage("Password changed successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-subpage">

      <div className="settings-subpage-header">
        <div>
          <h1>Security</h1>
          <p>Manage your password and account security</p>
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
            🔐
          </div>

          <div>
            <h2>Change Password</h2>
            <p>
              Update your account password regularly to keep
              your account secure.
            </p>
          </div>
        </div>

        <form
          className="security-form"
          onSubmit={handleSubmit}
        >

          <div className="settings-form-group">
            <label>Current Password</label>

            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="settings-form-group">
            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="settings-form-group">
            <label>Confirm New Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          {error && (
            <div className="settings-error">
              {error}
            </div>
          )}

          {message && (
            <div className="settings-success">
              {message}
            </div>
          )}

          <div className="settings-save-area">

            <button
              type="submit"
              className="settings-save-button"
              disabled={saving}
            >
              {saving
                ? "Changing Password..."
                : "Change Password"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default SecuritySettings;