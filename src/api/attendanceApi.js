import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/attendance`

// =========================
// Get All Attendance
// =========================
export const getAttendance = () => {
  return axios.get(API_URL);
};

// =========================
// Get Attendance By ID
// =========================
export const getAttendanceById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// =========================
// Add Attendance
// =========================
export const addAttendance = (attendance) => {
  return axios.post(API_URL, attendance);
};

// =========================
// Update Attendance
// =========================
export const updateAttendance = (id, attendance) => {
  return axios.put(`${API_URL}/${id}`, attendance);
};

// =========================
// Delete Attendance
// =========================
export const deleteAttendance = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};