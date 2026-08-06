import axios from "axios";

const API_URL = "http://localhost:8080/profile";

// Get All Profiles
export const getProfiles = () => axios.get(API_URL);

// Get Profile By ID
export const getProfileById = (id) =>
  axios.get(`${API_URL}/${id}`);

// Add Profile
export const addProfile = (profile) =>
  axios.post(API_URL, profile);

// Update Profile
export const updateProfile = (id, profile) =>
  axios.put(`${API_URL}/${id}`, profile);

// Delete Profile
export const deleteProfile = (id) =>
  axios.delete(`${API_URL}/${id}`);