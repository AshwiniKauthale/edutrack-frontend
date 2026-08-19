
import axios from "axios";

// Backend dashboard API
const API_URL = "http://localhost:8080/dashboard";

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async () => {
    console.log("========== DASHBOARD API ==========");

    try {
        // Get JWT token from localStorage
        const token = localStorage.getItem("token");

        console.log("Token exists:", !!token);

        if (!token) {
            throw new Error("Authentication token not found");
        }

        console.log(
            "Token preview:",
            token.substring(0, 25) + "..."
        );

        // API request
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Dashboard response:", response.data);
        console.log("=================================");

        /*
         * IMPORTANT:
         *
         * Backend returns:
         *
         * {
         *   role: "ROLE_SUPER_ADMIN",
         *   success: true,
         *   totalStudents: 0,
         *   activeStudents: 0,
         *   totalClassrooms: 0,
         *   ...
         * }
         *
         * Therefore we return response.data directly.
         */
        return response.data;

    } catch (error) {
        console.error("========== DASHBOARD API ERROR ==========");

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response:", error.response.data);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("No response received from server.");
            console.error("Request:", error.request);
        } else {
            console.error("Error:", error.message);
        }

        console.error("========================================");

        throw error;
    }
};
