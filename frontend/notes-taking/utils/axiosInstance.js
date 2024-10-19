import axios from 'axios';
import { BASE_URL } from './constant.js';

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
	  const token = localStorage.getItem('token');
	  if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	  }
	  return config;
	},
	(error) => {
	  return Promise.reject(error);
	}
  );

  export default axiosInstance;
