const API_BASE_URL = "http://localhost:8080/api/settings";

// =====================================================
// AUTH HEADER
// =====================================================

const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

// =====================================================
// USER SETTINGS
// =====================================================

export const getSettings = async () => {

    const response = await fetch(
        API_BASE_URL,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load settings");
    }

    return response.json();
};

export const updateSettings = async (settings) => {

    const response = await fetch(
        API_BASE_URL,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(settings),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update settings");
    }

    return response.json();
};

// =====================================================
// PASSWORD
// =====================================================

export const changePassword = async (data) => {

    const response = await fetch(
        `${API_BASE_URL}/password`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    );

    const result = await response.text();

    if (!response.ok) {
        throw new Error(result);
    }

    return result;
};

// =====================================================
// ORGANIZATION
// =====================================================

export const getOrganizationSettings = async () => {

    const response = await fetch(
        `${API_BASE_URL}/organization`,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load organization settings"
        );
    }

    return response.json();
};

export const updateOrganizationSettings = async (
    data
) => {

    const response = await fetch(
        `${API_BASE_URL}/organization`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to update organization settings"
        );
    }

    return response.json();
};

// =====================================================
// ACADEMIC
// =====================================================

export const getAcademicSettings = async () => {

    const response = await fetch(
        `${API_BASE_URL}/academic`,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load academic settings"
        );
    }

    return response.json();
};

export const updateAcademicSettings = async (
    data
) => {

    const response = await fetch(
        `${API_BASE_URL}/academic`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to update academic settings"
        );
    }

    return response.json();
};

// =====================================================
// ACTIVITY
// =====================================================

export const getActivityHistory = async () => {

    const response = await fetch(
        `${API_BASE_URL}/activity`,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load activity history"
        );
    }

    return response.json();
};