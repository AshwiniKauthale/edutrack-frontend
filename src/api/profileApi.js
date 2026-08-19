import axios from "axios";

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:8080/api/profile";


// =====================================================
// GET AUTH TOKEN
// =====================================================

const getToken = () => {

    return (
        localStorage.getItem("token") ||
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("accessToken")
    );
};


// =====================================================
// AUTH HEADERS
// =====================================================

const getAuthConfig = () => {

    const token = getToken();

    return {
        headers: {
            "Content-Type": "application/json",

            ...(token && {
                Authorization: `Bearer ${token}`
            })
        }
    };
};


// =====================================================
// GET CURRENT PROFILE
// =====================================================

export const getProfile = async () => {

    return axios.get(
        API_URL,
        getAuthConfig()
    );
};


// =====================================================
// GET PROFILES
// Compatibility function
// =====================================================

export const getProfiles = async () => {

    return getProfile();
};


// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (profileData) => {

    return axios.put(
        API_URL,
        profileData,
        getAuthConfig()
    );
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword = async (passwordData) => {

    return axios.put(
        `${API_URL}/change-password`,
        passwordData,
        getAuthConfig()
    );
};