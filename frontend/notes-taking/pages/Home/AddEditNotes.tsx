import React, { useState, useEffect } from 'react';
import Tag from '../../components/Input/Tag';
import { MdClose } from 'react-icons/md';
import { createNote, updateNote } from './api'; // Import the API functions
import { Note } from './types'; // Assuming you have a Note type defined somewhere
import { toast } from 'react-toastify';

interface AddEditNotesProps {
  noteData: Note | null;
  type: 'add' | 'edit';
  onClose: () => void;
  onAddNote: (newNote: Note) => void; // Add handler
  onUpdateNote: (updatedNote: Note) => void; // Update handler
}

const AddEditNotes: React.FC<AddEditNotesProps> = ({ noteData, type, onClose, onAddNote, onUpdateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Set the initial state when editing a note
  useEffect(() => {
    if (type === 'edit' && noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
      setTags(noteData.tags);
    }
  }, [noteData, type]);

  const addNewNote = async () => {
    try {
      const newNote = await createNote({
        title,
        content,
        tags,
        isPinned: false, // Assuming new notes are not pinned initially
        userId: noteData?.userId || 'default-user-id', // Assuming there's a user ID
      });

	  toast.success('Note created successfully!');
      onAddNote(newNote); // Pass the new note to Home.tsx
      onClose(); // Close the modal after successful creation
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Failed to create note');
    }
  };

  const editNote = async () => {
    if (!noteData?._id) return; // If noteData doesn't exist, do nothing

    try {
      const updatedNote = await updateNote(noteData._id, {
        title,
        content,
        tags,
        isPinned: noteData.isPinned,
      });

	  toast.success('Note updated successfully!'); // Add this line
      onUpdateNote(updatedNote); // Pass the updated note to Home.tsx
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating note:', error);
      setError('Failed to update note');
    }
  };

  const handleAddNote = () => {
    if (title.trim() === '' || content.trim() === '') {
      setError('Title and Content are required');
      return;
    }

    setError('');

    if (type === 'edit') {
      editNote(); // Call edit note function
    } else {
      addNewNote(); // Call add new note function
    }
  };

  return (
    <div className='relative'>
      <button
        className='w-10 h-10 flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 rounded-full bg-slate-100 text-slate-400'
        onClick={onClose}
      >
        <MdClose className='text-[24px]' />
      </button>
      <h3 className='text-lg font-medium mb-2'>
        {type === 'edit' ? 'Edit Note' : 'Add Note'}
      </h3>
      {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
      <input
        className='w-full p-2 border rounded mb-3'
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className='w-full p-2 border rounded mb-3'
        placeholder='Content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
      />
      <Tag
        tags={tags}
        setTags={setTags}
      />
      <button
        className='w-full bg-blue-500 text-white p-2 rounded'
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'Update Note' : 'Add Note'}
      </button>
    </div>
  );
};

export default AddEditNotes;
