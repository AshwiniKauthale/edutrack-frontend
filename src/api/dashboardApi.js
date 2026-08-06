import axios from "axios";

`${import.meta.env.VITE_API_URL}/dashboard`

// Dashboard Statistics
export const getDashboardStats = () => {
  return axios.get(API_URL);
};

// Dashboard Charts
export const getDashboardCharts = () => {
  return axios.get(`${API_URL}/charts`);
};