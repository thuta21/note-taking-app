import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-user`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    throw error.response?.data || 'An error occurred';
  }
};

export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/notes`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    throw error.response?.data || 'An error occurred';
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/notes/${id}`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    throw error.response?.data || 'An error occurred';
  }
};

export const pinNote = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/notes/${id}`, data, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    throw error.response?.data || 'An error occurred';
  }
};

// Add a new note (Create)
export const createNote = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/notes`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'An error occurred';
  }
};

// Update an existing note
export const updateNote = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/notes/${id}`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'An error occurred';
  }
};
