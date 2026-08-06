import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/batches`

export const getBatches = () => axios.get(API_URL);

export const getBatchById = (id) =>
  axios.get(`${API}/id/${id}`);

export const createBatch = (batch) =>
  axios.post(API, batch);

export const updateBatch = (id, batch) =>
  axios.put(`${API}/id/${id}`, batch);

export const deleteBatch = (id) =>
  axios.delete(`${API}/id/${id}`);