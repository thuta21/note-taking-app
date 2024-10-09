import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch}) => {
  return (
	<div className='w-80 flex items-center px-4 bg-slate-200 rounded-md'>
		<input
		  type="text"
		  placeholder='Search notes'
		  className='w-full text-xs bg-transparent py-[11px] focus:outline-none'
		  value={value}
		  onChange={onChange}
		/>

		{value && (
		  <IoMdClose
			className='text-slate-500 text-lg cursor-pointer mr-[10px]'
			onClick={onClearSearch}
		  />
		)}

		<FaMagnifyingGlass
		  className='text-slate-500 text-lg cursor-pointer'
		  onClick={handleSearch}
		/>
	</div>
  )
}

export default SearchBar
