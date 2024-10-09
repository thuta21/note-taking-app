import React from 'react'
import { getInitials } from '../../utils/helper.js'

const ProfileInfo = ({onLogout}) => {
  return (
	<div className='flex items-center gap-3'>
		<div className='w-12 h-12 flex items-center justify-center rounded-full border-[1.5px] bg-slate-500 text-white'>
			{getInitials('Thuta')}
		</div>

		<div>
			<p className='text-sm font-medium'>Thuta</p>
			<button className='text-sm text-slate-700 underline' onClick={onLogout}>
				Logout
			</button>
		</div>
	</div>
  )
}

export default ProfileInfo
