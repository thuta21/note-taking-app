import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../middleware/AuthContext';
import axios from 'axios'; // Import Axios

const Navbar = ({ userInfo, setNotes }) => { // Pass setNotes to update the notes list
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { logout } = useAuth();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notes', { // Ensure the URL is correct
        params: { searchQuery: searchValue },
        headers: getAuthHeaders(), // Include auth headers
      });
      setNotes(response.data); // Update the notes in the parent component
    } catch (error) {
      console.error('Error searching notes:', error);
    }
  };


  const onClearSearch = () => {
    setSearchValue(''); // Clear the input
    handleSearch(); // Fetch all notes when search is cleared
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Notes Taking</h2>

      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        onKeyDown={handleKeyDown} // Add the keyDown event to handle Enter press
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
