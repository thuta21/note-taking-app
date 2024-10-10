import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const Tag = ({ tags, setTags }) => {

  const [ tag, setTagsValue ] = useState('');

  const handleInputChange = (e) => {
	setTagsValue(e.target.value);
  }

  const addNewTag = () => {
	if (tag.trim() === '') return;

	setTags([...tags, tag.trim()]);
	setTagsValue("");
  }

  const handleKeyDown = (e) => {
	if (e.key === 'Enter') {
	  addNewTag();
	}
  }

  const handleRemoveTag = (index) => {
	setTags(tags.filter((tag, i) => i !== index));
  }

  return (
	<div>
		{tags?.length > 0 && (
			<div className='flex items-center gap-2 flex-wrap mt-2'>
				{tags.map((tag, index) => (
					<span
						key={index}
						className='flex items-center gap-2 text-xs bg-blue-700 text-white px-3 py-1 rounded-md'
					>
						{tag}
						<button className='' onClick={() => {
							handleRemoveTag(index);
						}}>
							<MdClose />
						</button>
					</span>
				))}
			</div>
		)}
		<div className='flex items-center gap-4 mt-3'>
			<input
				type="text"
				className='text-sm text-slate-950 border p-2 bg-transparent outline-none rounded-md focus:outline-none'
				placeholder='Add tag'
				value={tag}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			/>

			<button
				className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'
				onClick={() => addNewTag()}
			>
				<MdAdd className='text-[24px] text-blue-500 hover:text-white' />
			</button>
		</div>
	</div>
  )
}

export default Tag
