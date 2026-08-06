import axios from "axios";

const API_URL = "http://localhost:8080/students";

// =========================
// Get All Students
// =========================
export const getStudents = () => {
  return axios.get(API_URL);
};

// =========================
// Get Student By ID
// =========================
export const getStudentById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// =========================
// Add Student
// =========================
export const addStudent = (student) => {
  return axios.post(API_URL, student);
};

// =========================
// Update Student
// =========================
export const updateStudent = (id, student) => {
  return axios.put(`${API_URL}/${id}`, student);
};

// =========================
// Delete Student
// =========================
export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};