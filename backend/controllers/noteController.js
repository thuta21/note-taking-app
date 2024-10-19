import noteService from '../services/noteService.js';

const index = async (req, res) => {
	return noteService.index(req, res);
};

const show = async (req, res) => {
	return noteService.show(req, res);
};

const create = async (req, res) => {
	return noteService.create(req, res);
};

const update = async (req, res) => {
	return noteService.update(req, res);
};

const destroy = async (req, res) => {
	return noteService.destroy(req, res);
};

export default {
	index,
	show,
	create,
	update,
	destroy
};
