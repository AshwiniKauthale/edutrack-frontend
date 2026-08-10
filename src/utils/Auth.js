import axios from "axios";

// =====================================================
// Backend API URL
// =====================================================

const API_URL = import.meta.env.VITE_API_URL;


// =====================================================
// LOGIN
// =====================================================

export const login = async (usernameOrEmail, password) => {

    try {

        const response = await axios.post(
            `${API_URL}/api/auth/login`,
            {
                usernameOrEmail: usernameOrEmail,
                password: password,
            }
        );

        const data = response.data;

        console.log("Login API response:", data);


        // =================================================
        // Save login information
        // =================================================

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem(
            "username",
            data.username || ""
        );

        localStorage.setItem(
            "fullName",
            data.fullName || ""
        );

        localStorage.setItem(
            "email",
            data.email || ""
        );

        localStorage.setItem(
            "role",
            data.role || "USER"
        );


        // =================================================
        // Save JWT token if backend returns one
        // =================================================

        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

        }


        return data;

    } catch (error) {

        console.error(
            "Login API error:",
            error
        );

        // Important:
        // Throw the original Axios error so Login.jsx
        // can display the backend error message.

        throw error;
    }
};


// =====================================================
// LOGOUT
// =====================================================

export const logout = () => {

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("username");

    localStorage.removeItem("fullName");

    localStorage.removeItem("email");

    localStorage.removeItem("role");

    localStorage.removeItem("token");
};


// =====================================================
// CHECK AUTHENTICATION
// =====================================================

export const isAuthenticated = () => {

    return (
        localStorage.getItem("isLoggedIn") === "true"
    );
};


// =====================================================
// GET USERNAME
// =====================================================

export const getUsername = () => {

    return localStorage.getItem("username") || "";
};


// =====================================================
// GET FULL NAME
// =====================================================

export const getFullName = () => {

    return localStorage.getItem("fullName") || "";
};


// =====================================================
// GET EMAIL
// =====================================================

export const getEmail = () => {

    return localStorage.getItem("email") || "";
};


// =====================================================
// GET ROLE
// =====================================================

export const getRole = () => {

    return localStorage.getItem("role") || "USER";
};


// =====================================================
// GET JWT TOKEN
// =====================================================

export const getToken = () => {

    return localStorage.getItem("token") || "";
};


// =====================================================
// GET AUTHORIZATION HEADER
// =====================================================

export const getAuthHeader = () => {

    const token = getToken();

    if (!token) {
        return {};
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};