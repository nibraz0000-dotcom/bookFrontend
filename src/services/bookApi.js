import axios from "axios";

// Your Express backend URL
const API_URL = "http://localhost:5000/api/Books";

// Helper to get auth token from localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || null;
};

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all books
export const getAllBooks = () => {
  return axios.get(API_URL);
};

// Get one book
export const getBookById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Add book (admin only)
export const addBook = (bookData) => {
  return axios.post(API_URL, bookData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeaders()
    }
  });
};

// Update book (admin only)
export const updateBook = (id, bookData) => {
  return axios.put(`${API_URL}/${id}`, bookData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeaders()
    }
  });
};

// Delete book (admin only)
export const deleteBook = (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders()
  });
};

// Search books
export const searchBook = (query) => {
  return axios.get(`${API_URL}/search?query=${query}`);
};