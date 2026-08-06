import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/teachers`

export const getTeachers = () => axios.get(API_URL);

export const getTeacherById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const addTeacher = (teacher) =>
  axios.post(API_URL, teacher);

export const updateTeacher = (id, teacher) =>
  axios.put(`${API_URL}/${id}`, teacher);

export const deleteTeacher = (id) =>
  axios.delete(`${API_URL}/${id}`);