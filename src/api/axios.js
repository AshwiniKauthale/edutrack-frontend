import axios from "axios";

// =====================================================
// AXIOS INSTANCE
// =====================================================

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error(
            "API ERROR:",
            error.response?.status,
            error.response?.data || error.message
        );

        return Promise.reject(error);
    }
);

export default api;