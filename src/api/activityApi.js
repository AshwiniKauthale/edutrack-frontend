const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080";


// =====================================================
// GET AUTH HEADERS
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
// GET RECENT ACTIVITY
// =====================================================

export const getRecentActivity = async () => {

    const response = await fetch(
        `${API_BASE_URL}/api/settings/activity`,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {

        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        if (response.status === 403) {
            throw new Error("Access denied");
        }

        throw new Error(
            "Failed to load recent activity"
        );
    }

    return await response.json();
};