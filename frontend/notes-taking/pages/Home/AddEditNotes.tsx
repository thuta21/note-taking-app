import React, { useState } from 'react'
import Tag from '../../components/Input/Tag'
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({noteData, type, onClose }) => {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ tags, setTags ] = useState([]);

  const [ error , setError ] = useState('');

  const addNewNote = () => {}

  const editNote = () => {}

  const handleAddNote = () => {
	if (title.trim() === '' || content.trim() === '') {
	  setError('Title and Content is required');
	  return;
	}

	setError('');

	if (type === 'edit') {
	  editNote()
	} else {
	  addNewNote()
	}
  }

  return (
	<div className='relative'>
		<button
			className='w-10 h-10 flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 rounded-full bg-slate-100 text-slate-400'
			onClick={onClose}
		>
			<MdClose className='text-xl text-slate-400'/>
		</button>

		<div className='flex flex-col gap-2'>
			<label className='input-label'>Title</label>
			<input
				type="text"
				className='text-2xl text-slate-950 font-medium p-2 outline-none rounded-md focus:outline-none'
				placeholder='Go to gym at 5'
				value={title}
				onChange={({target}) => setTitle(target.value)}
			/>
		</div>

		<div className='flex flex-col gap-2 mt-4'>
			<label className='input-label'>Content</label>
			<textarea
				className='p-2 outline-none rounded-md focus:outline-none'
				placeholder='Write your notes here'
				rows={10}
				value={content}
				onChange={({target}) => setContent(target.value)}
			></textarea>
		</div>

		<div className="mt-3">
			<label className='input-label'>Tags</label>
			<Tag tags={tags} setTags={setTags}/>
		</div>

		{error && <p className="text-red-500 text-sm">{error}</p>}

		<button
		  className='btn-primary font-medium mt-5 p-3'
		  onClick={() => {
			handleAddNote();
		  }}
		> ADD </button>
	</div>
  )
}

export default AddEditNotes
