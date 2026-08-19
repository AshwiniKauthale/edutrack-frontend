import api from "./axios";

export const loginUser = async (loginData) => {
    return api.post("/api/auth/login", loginData);
};

export const registerUser = async (registerData) => {
    return api.post("/api/auth/register", registerData);
};
