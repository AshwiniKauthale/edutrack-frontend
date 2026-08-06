import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/assignments`

export const getAssignments = () => axios.get(API_URL);

export const getAssignmentById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const addAssignment = (assignment) =>
  axios.post(API_URL, assignment);

export const updateAssignment = (id, assignment) =>
  axios.put(`${API_URL}/${id}`, assignment);

export const deleteAssignment = (id) =>
  axios.delete(`${API_URL}/${id}`);