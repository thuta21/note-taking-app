import Note from '../models/note.js';

const index = async (req, res) => {
	const { id } = req.user;
	const { searchQuery } = req.query;

	try {
	  const query = {
		userId: id,
		...(searchQuery && {
		  $or: [
			{ title: { $regex: searchQuery, $options: "i" } },
			{ content: { $regex: searchQuery, $options: "i" } }
		  ]
		})
	  };

	  const notes = await Note.find(query);
	  return res.status(200).json(notes);
	} catch (error) {
	  return res.status(500).json({ error: error.message });
	}
};

const show = async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		if (!note) return res.status(404).json({ error: "Note not found" });
		return res.status(200).json(note);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const create = async (req, res) => {
	const { id } = req.user;
	try {
		const { title, content, tags, isPinned } = req.body;
		const newNote = new Note({
			title,
			content,
			tags : tags || [],
			isPinned,
			userId: id,
		});

		const savedNote = await newNote.save();
		return res.status(201).json(savedNote);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const update = async (req, res) => {
	try {
		const { title, content, tags, isPinned } = req.body;
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.id,
			{ title, content, tags, isPinned },
			{ new: true }
		);
		if (!updatedNote) return res.status(404).json({ error: "Note not found" });
		return res.status(200).json(updatedNote);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const destroy = async (req, res) => {
	try {
		const note = await Note.findByIdAndDelete(req.params.id);
		if (!note) return res.status(404).json({ error: "Note not found" });
		return res.status(200).json({ message: "Note deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export default {
	index,
	show,
	create,
	update,
	destroy
};
