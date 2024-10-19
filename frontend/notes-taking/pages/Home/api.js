import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getUser = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error.response?.data || 'An error occurred';
  }
};
