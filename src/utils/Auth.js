import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// =====================================================
// LOGIN
// =====================================================

export const login = async (usernameOrEmail, password) => {

    const response = await axios.post(
        `${API_URL}/login`,
        {
            usernameOrEmail: usernameOrEmail,
            password: password
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    );

    const data = response.data;


    // =================================================
    // SAVE AUTHENTICATION DATA
    // =================================================

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    if (data.username) {
        localStorage.setItem("username", data.username);
    }

    if (data.fullName) {
        localStorage.setItem("fullName", data.fullName);
    }

    if (data.email) {
        localStorage.setItem("email", data.email);
    }

    if (data.role) {
        localStorage.setItem("role", data.role);
    }

    return data;
};


// =====================================================
// REGISTER
// =====================================================

export const register = async (registerData) => {

    const response = await axios.post(
        `${API_URL}/register`,
        registerData,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    );

    return response.data;
};


// =====================================================
// TOKEN
// =====================================================

export const getToken = () => {
    return localStorage.getItem("token");
};


// =====================================================
// AUTHENTICATION CHECK
// =====================================================

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");

    return !!token;
};


// =====================================================
// USERNAME
// =====================================================

export const getUsername = () => {
    return localStorage.getItem("username");
};


// =====================================================
// FULL NAME
// =====================================================

export const getFullName = () => {
    return localStorage.getItem("fullName");
};


// =====================================================
// EMAIL
// =====================================================

export const getEmail = () => {
    return localStorage.getItem("email");
};


// =====================================================
// ROLE
// =====================================================

export const getRole = () => {
    return localStorage.getItem("role");
};


// =====================================================
// AUTH HEADERS
// =====================================================

export const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        Authorization: token
            ? `Bearer ${token}`
            : "",
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
};


// =====================================================
// LOGOUT
// =====================================================

export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
};