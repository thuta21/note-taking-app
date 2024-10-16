import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Notes from '../../components/Cards/Notes'
import AddEditNotes from './AddEditNotes'
import { MdAddCircle } from 'react-icons/md'
import Modal from 'react-modal'

const Home = () => {

  const [ showAddEditNote, setShowAddEditNote ] = useState({
    isShowed: false,
    type: 'add',
    data: null
  });

  return (
    <div>
      <Navbar />

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <Notes
            title={"Note One"}
            date={"3rd April 2025"}
            content={"this is content"}
            tags={["tag1", "tag2"]}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setShowAddEditNote({ isShowed: true, type: 'add', data: null })
        }}>
        <MdAddCircle className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={showAddEditNote.isShowed}
        onRequestClose={() => setShowAddEditNote({ isShowed: false, type: 'add', data: null })}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
        contentLabel="Add/Edit Note"
        className='w-[40%] max-h-3/4 bg-white rounded-md shadow-lg p-5 mx-auto mt-14 overflow-scroll'
      >
        <AddEditNotes
          noteData={showAddEditNote.data}
          type={showAddEditNote.type}
          onClose={() => setShowAddEditNote({ isShowed: false, type: 'add', data: null })}
        />
      </Modal>
    </div>
  )
}

export default Home
