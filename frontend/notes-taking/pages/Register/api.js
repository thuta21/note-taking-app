import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
