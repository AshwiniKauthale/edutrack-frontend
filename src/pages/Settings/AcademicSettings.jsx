import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsSubPages.css";

const API_URL = import.meta.env.VITE_API_URL;

function AcademicSettings() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        academicYear: "",
        semester: "",
        workingDays: "",
        defaultClassDuration: "",
        attendanceThreshold: "",
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
    // LOAD SETTINGS
    // =====================================================

    useEffect(() => {
        loadAcademicSettings();
    }, []);

    const loadAcademicSettings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/settings/academic`,
                {
                    method: "GET",
                    headers: getAuthHeaders(),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Unable to load academic settings"
                );
            }

            const data = await response.json();

            setFormData({
                academicYear: data.academicYear || "",
                semester: data.semester || "",
                workingDays:
                    data.workingDays !== undefined &&
                    data.workingDays !== null
                        ? data.workingDays
                        : "",
                defaultClassDuration:
                    data.defaultClassDuration !== undefined &&
                    data.defaultClassDuration !== null
                        ? data.defaultClassDuration
                        : "",
                attendanceThreshold:
                    data.attendanceThreshold !== undefined &&
                    data.attendanceThreshold !== null
                        ? data.attendanceThreshold
                        : "",
            });
        } catch (err) {
            console.error(
                "Error loading academic settings:",
                err
            );

            setError(
                err.message ||
                "Failed to load academic settings"
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // HANDLE CHANGE
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
            const payload = {
                academicYear: formData.academicYear,
                semester: formData.semester,
                workingDays:
                    formData.workingDays === ""
                        ? null
                        : Number(formData.workingDays),

                defaultClassDuration:
                    formData.defaultClassDuration === ""
                        ? null
                        : Number(
                            formData.defaultClassDuration
                        ),

                attendanceThreshold:
                    formData.attendanceThreshold === ""
                        ? null
                        : Number(
                            formData.attendanceThreshold
                        ),
            };

            const response = await fetch(
                `${API_URL}/api/settings/academic`,
                {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    typeof result === "string"
                        ? result
                        : "Failed to save academic settings"
                );
            }

            setFormData({
                academicYear:
                    result.academicYear || "",

                semester:
                    result.semester || "",

                workingDays:
                    result.workingDays ?? "",

                defaultClassDuration:
                    result.defaultClassDuration ?? "",

                attendanceThreshold:
                    result.attendanceThreshold ?? "",
            });

            setSuccess(
                "Academic settings saved successfully."
            );
        } catch (err) {
            console.error(
                "Error saving academic settings:",
                err
            );

            setError(
                err.message ||
                "Failed to save academic settings"
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
                    Loading academic settings...
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
                    <h1>Academic Settings</h1>

                    <p>
                        Configure academic year, semester,
                        classes and attendance rules.
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
                        🎓
                    </div>

                    <div>
                        <h2>Academic Configuration</h2>

                        <p>
                            Set the default academic
                            configuration for EduTrack.
                        </p>
                    </div>

                </div>

                {/* FORM */}

                <form
                    className="settings-form"
                    onSubmit={handleSubmit}
                >

                    <div className="appearance-grid">

                        {/* Academic Year */}

                        <div className="appearance-field">

                            <label htmlFor="academicYear">
                                Academic Year
                            </label>

                            <input
                                id="academicYear"
                                name="academicYear"
                                type="text"
                                value={formData.academicYear}
                                onChange={handleChange}
                                placeholder="e.g. 2026-2027"
                            />

                        </div>

                        {/* Semester */}

                        <div className="appearance-field">

                            <label htmlFor="semester">
                                Semester
                            </label>

                            <select
                                id="semester"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select Semester
                                </option>

                                <option value="SEMESTER_1">
                                    Semester 1
                                </option>

                                <option value="SEMESTER_2">
                                    Semester 2
                                </option>

                                <option value="FIRST">
                                    First Semester
                                </option>

                                <option value="SECOND">
                                    Second Semester
                                </option>
                            </select>

                        </div>

                        {/* Working Days */}

                        <div className="appearance-field">

                            <label htmlFor="workingDays">
                                Working Days
                            </label>

                            <input
                                id="workingDays"
                                name="workingDays"
                                type="number"
                                min="1"
                                max="366"
                                value={formData.workingDays}
                                onChange={handleChange}
                                placeholder="e.g. 240"
                            />

                        </div>

                        {/* Class Duration */}

                        <div className="appearance-field">

                            <label htmlFor="defaultClassDuration">
                                Default Class Duration
                            </label>

                            <input
                                id="defaultClassDuration"
                                name="defaultClassDuration"
                                type="number"
                                min="1"
                                value={
                                    formData.defaultClassDuration
                                }
                                onChange={handleChange}
                                placeholder="Duration in minutes"
                            />

                        </div>

                        {/* Attendance Threshold */}

                        <div className="appearance-field">

                            <label htmlFor="attendanceThreshold">
                                Attendance Threshold (%)
                            </label>

                            <input
                                id="attendanceThreshold"
                                name="attendanceThreshold"
                                type="number"
                                min="0"
                                max="100"
                                value={
                                    formData.attendanceThreshold
                                }
                                onChange={handleChange}
                                placeholder="e.g. 75"
                            />

                        </div>

                    </div>

                    {/* INFO */}

                    <div className="settings-info-box">

                        <span className="settings-info-icon">
                            ℹ️
                        </span>

                        <div>
                            <strong>
                                Attendance Rule
                            </strong>

                            <p>
                                Students below the configured
                                attendance threshold can be
                                identified as having low
                                attendance.
                            </p>
                        </div>

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
                                : "Save Academic Settings"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AcademicSettings;