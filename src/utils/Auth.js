import axios from "axios";

const API = import.meta.env.VITE_API_URL;

/**
 * Login user
 *
 * Can login using:
 * - Username
 * - Email
 */
export const login = async (usernameOrEmail, password) => {

    const response = await axios.post(
        `${API_URL}/login`,
        {
            usernameOrEmail: usernameOrEmail,
            password: password
        }
    );

    const user = response.data;

    // Store login information
    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem(
        "username",
        user.username
    );

    localStorage.setItem(
        "fullName",
        user.fullName
    );

    localStorage.setItem(
        "email",
        user.email
    );

    localStorage.setItem(
        "role",
        user.role
    );

    return user;
};


/**
 * Logout
 */
export const logout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

};


/**
 * Check whether user is logged in
 */
export const isAuthenticated = () => {

    return localStorage.getItem("isLoggedIn") === "true";

};


/**
 * Get username
 */
export const getUsername = () => {

    return localStorage.getItem("username");

};


/**
 * Get full name
 */
export const getFullName = () => {

    return localStorage.getItem("fullName");

};


/**
 * Get email
 */
export const getEmail = () => {

    return localStorage.getItem("email");

};


/**
 * Get role
 */
export const getRole = () => {

    return localStorage.getItem("role");

};


/**
 * Check USER
 */
export const isUser = () => {

    return getRole() === "USER";

};


/**
 * Check ADMIN
 */
export const isAdmin = () => {

    return getRole() === "ADMIN";

};


/**
 * Check SUPER ADMIN
 */
export const isSuperAdmin = () => {

    return getRole() === "SUPER_ADMIN";

};