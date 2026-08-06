import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/classrooms`

export const getClassrooms = () =>
  axios.get(API_URL);

export const getClassroomById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const addClassroom = (classroom) =>
  axios.post(API_URL, classroom);

export const updateClassroom = (id, classroom) =>
  axios.put(`${API_URL}/${id}`, classroom);

export const deleteClassroom = (id) =>
  axios.delete(`${API_URL}/${id}`);