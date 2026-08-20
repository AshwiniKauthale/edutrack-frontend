import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsSubPages.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://edutrack-backend-8ior.onrender.com";

function AppearanceSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    theme: "LIGHT",
    sidebarMode: "EXPANDED",
    compactMode: false,
    animations: true,
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

        const response = await fetch(
          `${API_URL}/api/settings`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load settings (${response.status})`
          );
        }

        const data = await response.json();

        setSettings({
          theme: data.theme || "LIGHT",
          sidebarMode:
            data.sidebarMode || "EXPANDED",
          compactMode:
            data.compactMode ?? false,
          animations:
            data.animations ?? true,
        });
      } catch (error) {
        console.error(
          "Error loading appearance settings:",
          error
        );
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const token = getToken();

      const response = await fetch(
        `${API_URL}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to save appearance settings (${response.status})`
        );
      }

      setMessage(
        "Appearance settings saved successfully."
      );
    } catch (error) {
      console.error(
        "Error saving appearance settings:",
        error
      );

      setMessage(
        "Unable to save appearance settings."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-subpage">

      <div className="settings-subpage-header">

        <div>
          <h1>Appearance</h1>

          <p>
            Customize the appearance of EduTrack
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
            🎨
          </div>

          <div>
            <h2>Appearance Preferences</h2>

            <p>
              Customize how EduTrack looks and behaves.
            </p>
          </div>

        </div>

        <div className="appearance-grid">

          <div className="appearance-field">

            <label>Theme</label>

            <select
              value={settings.theme}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  theme: e.target.value,
                })
              }
            >
              <option value="LIGHT">
                Light
              </option>

              <option value="DARK">
                Dark
              </option>

              <option value="SYSTEM">
                System Default
              </option>
            </select>

          </div>

          <div className="appearance-field">

            <label>Sidebar Mode</label>

            <select
              value={settings.sidebarMode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  sidebarMode: e.target.value,
                })
              }
            >
              <option value="EXPANDED">
                Expanded
              </option>

              <option value="COLLAPSED">
                Collapsed
              </option>
            </select>

          </div>

        </div>

        <div className="settings-option">

          <div className="settings-option-left">

            <div className="settings-option-icon">
              📦
            </div>

            <div>
              <h3>Compact Mode</h3>

              <p>
                Use a more compact layout to display
                more content.
              </p>
            </div>

          </div>

          <button
            type="button"
            className={`settings-toggle ${
              settings.compactMode
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSettings({
                ...settings,
                compactMode:
                  !settings.compactMode,
              })
            }
          >
            <span />
          </button>

        </div>

        <div className="settings-option">

          <div className="settings-option-left">

            <div className="settings-option-icon">
              ✨
            </div>

            <div>
              <h3>Animations</h3>

              <p>
                Enable smooth animations throughout
                the application.
              </p>
            </div>

          </div>

          <button
            type="button"
            className={`settings-toggle ${
              settings.animations
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSettings({
                ...settings,
                animations:
                  !settings.animations,
              })
            }
          >
            <span />
          </button>

        </div>

        <div className="settings-save-area">

          {message && (
            <span className="settings-save-message">
              {message}
            </span>
          )}

          <button
            type="button"
            className="settings-save-button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default AppearanceSettings;