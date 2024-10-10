import React from 'react'

const AddEditNotes = () => {
  return (
	<div>
		<div className='flex flex-col gap-2'>
			<label className='input-label'>Title</label>
			<input
				type="text"
				className='text-2xl text-slate-950 font-medium p-2 outline-none rounded-md focus:outline-none'
				placeholder='Go to gym at 5'
			/>
		</div>

		<div className='flex flex-col gap-2 mt-4'>
			<label className='input-label'>Content</label>
			<textarea
				className='p-2 outline-none rounded-md focus:outline-none'
				placeholder='Write your notes here'
				rows={10}
			></textarea>
		</div>

		<div className="mt-3">
			<label className='input-label'>Tags</label>
		</div>

		<button
		  className='btn-primary font-medium mt-5 p-3'
		  onClick={() => {}}
		> ADD </button>
	</div>
  )
}

export default AddEditNotes
