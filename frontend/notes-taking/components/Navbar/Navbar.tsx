import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate;
  const [ searchValue, setSearchValue ] = useState('');

  const onLogout = () => {
	navigate('/login');
  }

  const handleSearch = () => {};

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

	  <ProfileInfo onLogout={onLogout} />
	</div>
  )
}

export default Navbar
