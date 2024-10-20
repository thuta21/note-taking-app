import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';

interface NotesProps {
  title: string;
  date: string;
  content: string;
  tags: string;
  isPinned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onPinNote: () => void;
}

const Notes: React.FC<NotesProps> = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-md transition-all ease-in-out '>
      <div className='flex items-center justify-between '>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'>{date}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? 'text-primary font-bold text-2xl' : 'text-slate-300'}`}
          onClick={onPinNote}
          style={isPinned ? { fontWeight: 'bold', fontSize: '24px', color: '#1d4ed8' } : {}}
        />
      </div>

      <p className='text-xs text-slate-600 mt-2 '>{content?.slice(0, 60)}</p>

      <div className='flex items-center justify-between mt-2'>
        <div className="text-xs text-slate-500">{ tags }</div>

        <div className="flex items-center gap-2">
          <MdCreate className="flex hover:text-green-400" onClick={onEdit} />
          <MdDelete className="flex hover:text-red-400" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default Notes;
