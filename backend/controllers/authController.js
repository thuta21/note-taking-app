import authService from '../services/authService.js';
const register = async (req, res) => {
	return authService.register('register');
}

const login = async (req, res) => {
	return authService.login('login');
}

export default {
	register,
	login
}
