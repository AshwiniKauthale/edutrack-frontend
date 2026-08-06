import axios from "axios";

const API_URL = "http://localhost:8080/dashboard";

// Dashboard Statistics
export const getDashboardStats = () => {
  return axios.get(API_URL);
};

// Dashboard Charts
export const getDashboardCharts = () => {
  return axios.get(`${API_URL}/charts`);
};