import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/batches`;

// Get all batches
export const getBatches = () => axios.get(API_URL);

// Get batch by ID
export const getBatchById = (id) =>
  axios.get(`${API_URL}/id/${id}`);

// Create batch
export const createBatch = (batch) =>
  axios.post(API_URL, batch);

// Update batch
export const updateBatch = (id, batch) =>
  axios.put(`${API_URL}/id/${id}`, batch);

// Delete batch
export const deleteBatch = (id) =>
  axios.delete(`${API_URL}/id/${id}`);