import React from 'react';
import { getInitials } from '../../utils/helper.js';

const ProfileInfo = ({ userInfo, onLogout }) => {
  const initials = userInfo ? getInitials(userInfo.name) : '';
  const userName = userInfo ? userInfo.name : 'Guest';

  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full border-[1.5px] bg-slate-500 text-white'>
        {initials}
      </div>

      <div>
        <p className='text-sm font-medium'>{userName}</p>
        <button className='text-sm text-slate-700 underline' onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
