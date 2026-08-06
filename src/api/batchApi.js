import axios from "axios";

const API = "http://localhost:8080/batches";

export const getBatches = () => axios.get(API);

export const getBatchById = (id) =>
  axios.get(`${API}/id/${id}`);

export const createBatch = (batch) =>
  axios.post(API, batch);

export const updateBatch = (id, batch) =>
  axios.put(`${API}/id/${id}`, batch);

export const deleteBatch = (id) =>
  axios.delete(`${API}/id/${id}`);