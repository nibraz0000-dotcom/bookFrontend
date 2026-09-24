import axios from "axios";

// API URL from environment variable (works on localhost & Vercel)
const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

// Register user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};

// Get user profile
export const getProfile = async () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgotpassword`, { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
  const response = await axios.post(`${API_URL}/resetpassword/${token}`, { password });
  return response.data;
};

// Get user from localStorage
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};