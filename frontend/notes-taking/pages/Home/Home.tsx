import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Notes from '../../components/Cards/Notes';
import AddEditNotes from './AddEditNotes';
import { MdAddCircle } from 'react-icons/md';
import Modal from 'react-modal';
import { getUser, getNotes, deleteNote, pinNote } from './api';
import moment from 'moment'; // Import moment
import { toast } from 'react-toastify';
import EmptyCard from '../../components/EmptyCard/EmptyCard';

// TypeScript Interfaces
interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdOn: string;
}

interface UserInfo {
  name: string;
  email: string;
}

interface ShowAddEditNote {
  isShowed: boolean;
  type: 'add' | 'edit';
  data: Note | null;
}

const Home: React.FC = () => {
  const [showAddEditNote, setShowAddEditNote] = useState<ShowAddEditNote>({
    isShowed: false,
    type: 'add',
    data: null,
  });

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [notes, setNotes] = useState<Note[]>([]); // Array of notes

  const getUserInfo = async () => {
    try {
      const response = await getUser();
      if (response.status === 200) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await getNotes(); // API call to get notes
      if (response.status === 200) {
        setNotes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete note handler
  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
      toast.success('Note deleted successfully!'); // Add this line
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete note'); // Add this line
    }
  };

  const handlePinNote = async (note: Note) => {
    try {
      await pinNote(note._id, { isPinned: !note.isPinned });
      setNotes(notes.map(n => (n._id === note._id ? { ...n, isPinned: !n.isPinned } : n)));
      toast.success(note.isPinned ? 'Note unpinned!' : 'Note pinned!'); // Add this line
    } catch (error) {
      console.error(error);
      toast.error('Failed to pin note'); // Add this line
    }
  };

  // Add a new note to the state
  const handleAddNote = (newNote: Note) => {
    setNotes([newNote, ...notes]); // Add the new note to the start of the list
  };

  // Update an existing note in the state
  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
  };

  useEffect(() => {
    getUserInfo();
    fetchNotes(); // Fetch notes on component mount
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} setNotes={setNotes}/>

      <div className='container mx-auto'>
        {notes.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className='grid grid-cols-3 gap-4 mt-8'>
            {notes.map(note => (
              <Notes
                key={note._id}
                title={note.title}
                date={moment(note.createdOn).format('D MMM YYYY')}
                content={note.content}
                tags={note.tags.join(", ")}
                isPinned={note.isPinned}
                onEdit={() => setShowAddEditNote({ isShowed: true, type: 'edit', data: note })}
                onDelete={() => handleDeleteNote(note._id)}
                onPinNote={() => handlePinNote(note)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setShowAddEditNote({ isShowed: true, type: 'add', data: null });
        }}>
        <MdAddCircle className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={showAddEditNote.isShowed}
        onRequestClose={() => setShowAddEditNote({ isShowed: false, type: 'add', data: null })}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
        contentLabel="Add/Edit Note"
        className='w-[40%] max-h-3/4 bg-white rounded-md shadow-lg p-5 mx-auto mt-14 overflow-scroll'
      >
        <AddEditNotes
          noteData={showAddEditNote.data}
          type={showAddEditNote.type}
          onClose={() => setShowAddEditNote({ isShowed: false, type: 'add', data: null })}
          onAddNote={handleAddNote} // Pass the add handler
          onUpdateNote={handleUpdateNote} // Pass the update handler
        />
      </Modal>
    </div>
  );
};

export default Home;
