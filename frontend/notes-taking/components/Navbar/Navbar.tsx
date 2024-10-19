import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../middleware/AuthContext'; // Import the Auth context

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { logout } = useAuth(); // Get the logout function from AuthContext

  const onLogout = () => {
    // Call the logout function to update the context state
    logout();

    // Navigate to login page after logout
    navigate('/login');
  };

  const handleSearch = () => {
    // Handle search functionality here
  };

  const onClearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Notes Taking</h2>

      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      {/* Pass userInfo down to ProfileInfo */}
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
