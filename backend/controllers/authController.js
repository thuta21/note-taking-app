import authService from '../services/authService.js';

const register = async (req, res) => {
	return authService.register(req, res);
}

const login = async (req, res) => {
	return authService.login(req, res);
}

const getUser = async (req, res) => {
    return authService.getUser(req, res);
}

export default {
	register,
	login,
	getUser
}
