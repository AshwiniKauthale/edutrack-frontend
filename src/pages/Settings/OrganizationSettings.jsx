import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsSubPages.css";

const API_URL = "http://localhost:8080";

function OrganizationSettings() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        instituteName: "",
        instituteEmail: "",
        contactNumber: "",
        address: "",
        website: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // =====================================================
    // AUTH HEADERS
    // =====================================================

    const getAuthHeaders = () => {
        const token =
            localStorage.getItem("token") ||
            localStorage.getItem("jwtToken") ||
            localStorage.getItem("accessToken");

        return {
            "Content-Type": "application/json",
            ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                }
                : {}),
        };
    };

    // =====================================================
    // LOAD ORGANIZATION SETTINGS
    // =====================================================

    useEffect(() => {
        loadOrganizationSettings();
    }, []);

    const loadOrganizationSettings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/settings/organization`,
                {
                    method: "GET",
                    headers: getAuthHeaders(),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Unable to load organization settings"
                );
            }

            const data = await response.json();

            setFormData({
                instituteName: data.instituteName || "",
                instituteEmail: data.instituteEmail || "",
                contactNumber: data.contactNumber || "",
                address: data.address || "",
                website: data.website || "",
            });
        } catch (err) {
            console.error(
                "Error loading organization settings:",
                err
            );

            setError(
                err.message ||
                "Failed to load organization settings"
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSuccess("");
        setError("");
    };

    // =====================================================
    // SAVE
    // =====================================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch(
                `${API_URL}/api/settings/organization`,
                {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    typeof result === "string"
                        ? result
                        : "Failed to save organization settings"
                );
            }

            setFormData({
                instituteName: result.instituteName || "",
                instituteEmail: result.instituteEmail || "",
                contactNumber: result.contactNumber || "",
                address: result.address || "",
                website: result.website || "",
            });

            setSuccess(
                "Organization settings saved successfully."
            );
        } catch (err) {
            console.error(
                "Error saving organization settings:",
                err
            );

            setError(
                err.message ||
                "Failed to save organization settings"
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="settings-subpage">
                <div className="settings-loading">
                    Loading organization settings...
                </div>
            </div>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="settings-subpage">

            {/* HEADER */}

            <div className="settings-subpage-header">

                <div>
                    <h1>Organization Settings</h1>

                    <p>
                        Manage your institute information and
                        contact details.
                    </p>
                </div>

                <button
                    type="button"
                    className="settings-back-button"
                    onClick={() => navigate("/settings")}
                >
                    ← Settings
                </button>

            </div>

            {/* MAIN CARD */}

            <div className="settings-section-card">

                {/* SECTION TITLE */}

                <div className="settings-section-title">

                    <div className="settings-section-icon">
                        🏫
                    </div>

                    <div>
                        <h2>Institute Information</h2>

                        <p>
                            Update the basic information of
                            your educational institute.
                        </p>
                    </div>

                </div>

                {/* FORM */}

                <form
                    className="settings-form"
                    onSubmit={handleSubmit}
                >

                    <div className="organization-grid">

                        {/* Institute Name */}

                        <div className="settings-form-group">

                            <label htmlFor="instituteName">
                                Institute Name
                            </label>

                            <input
                                id="instituteName"
                                name="instituteName"
                                type="text"
                                value={formData.instituteName}
                                onChange={handleChange}
                                placeholder="Enter institute name"
                            />

                        </div>

                        {/* Email */}

                        <div className="settings-form-group">

                            <label htmlFor="instituteEmail">
                                Institute Email
                            </label>

                            <input
                                id="instituteEmail"
                                name="instituteEmail"
                                type="email"
                                value={formData.instituteEmail}
                                onChange={handleChange}
                                placeholder="Enter institute email"
                            />

                        </div>

                        {/* Contact */}

                        <div className="settings-form-group">

                            <label htmlFor="contactNumber">
                                Contact Number
                            </label>

                            <input
                                id="contactNumber"
                                name="contactNumber"
                                type="text"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="Enter contact number"
                            />

                        </div>

                        {/* Website */}

                        <div className="settings-form-group">

                            <label htmlFor="website">
                                Website
                            </label>

                            <input
                                id="website"
                                name="website"
                                type="text"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />

                        </div>

                    </div>

                    {/* Address */}

                    <div className="settings-form-group">

                        <label htmlFor="address">
                            Address
                        </label>

                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter institute address"
                            rows="4"
                        />

                    </div>

                    {/* ERROR */}

                    {error && (
                        <div className="settings-error">
                            {error}
                        </div>
                    )}

                    {/* SUCCESS */}

                    {success && (
                        <div className="settings-success">
                            {success}
                        </div>
                    )}

                    {/* SAVE */}

                    <div className="settings-save-area">

                        <button
                            type="button"
                            className="settings-back-button"
                            onClick={() =>
                                navigate("/settings")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="settings-save-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Organization Settings"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default OrganizationSettings;