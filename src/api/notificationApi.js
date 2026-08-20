import axios from "axios";

const API_BASE_URL =
    `${import.meta.env.VITE_API_URL}/api/notifications`;

// =====================================================
// GET CURRENT USERNAME
// =====================================================

const getUsername = () => {
    try {
        const user =
            JSON.parse(localStorage.getItem("user")) ||
            JSON.parse(localStorage.getItem("currentUser"));

        if (user?.username) {
            return user.username;
        }

        if (user?.email) {
            return user.email;
        }

        const username =
            localStorage.getItem("username");

        if (username) {
            return username;
        }

        return "superadmin";

    } catch (error) {
        console.error(
            "Error getting username:",
            error
        );

        return "superadmin";
    }
};


// =====================================================
// AUTH HEADERS
// =====================================================

const getAuthHeaders = () => {

    const token =
        localStorage.getItem("token") ||
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("accessToken");

    return token
        ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          }
        : {
              "Content-Type": "application/json",
          };
};


// =====================================================
// GET NOTIFICATIONS
// =====================================================

export const getNotifications = async () => {

    const username = getUsername();

    const response = await axios.get(
        API_BASE_URL,
        {
            params: {
                username,
            },
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// =====================================================
// GET UNREAD COUNT
// =====================================================

export const getUnreadCount = async () => {

    const username = getUsername();

    const response = await axios.get(
        `${API_BASE_URL}/unread-count`,
        {
            params: {
                username,
            },
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// =====================================================
// MARK SINGLE AS READ
// =====================================================

export const markNotificationAsRead = async (
    notificationId
) => {

    const response = await axios.put(
        `${API_BASE_URL}/${notificationId}/read`,
        {},
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// =====================================================
// MARK ALL AS READ
// =====================================================

export const markAllNotificationsAsRead = async () => {

    const username = getUsername();

    const response = await axios.put(
        `${API_BASE_URL}/read-all`,
        {},
        {
            params: {
                username,
            },
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// =====================================================
// DELETE SINGLE
// =====================================================

export const deleteNotification = async (
    notificationId
) => {

    const response = await axios.delete(
        `${API_BASE_URL}/${notificationId}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// =====================================================
// DELETE ALL
// =====================================================

export const deleteAllNotifications = async () => {

    const username = getUsername();

    const response = await axios.delete(
        API_BASE_URL,
        {
            params: {
                username,
            },
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


// =====================================================
// CREATE NOTIFICATION
// =====================================================

export const createNotification = async (
    notification
) => {

    const response = await axios.post(
        API_BASE_URL,
        notification,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};