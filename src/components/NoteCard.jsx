import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
const NoteCard = () => {
  return (
    <div>
        <div className='flex justify-between border border-sky-500 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer'>
            <div>
                <p className='font-bold text-xl'>Title</p>
                <small>Time</small>
                <p>Lorem ipsum dolor sit...</p>
                <small className='font-bold'>#category</small>
            </div>

            <div className='flex flex-col justify-between items-end'>
                <div>
                <FontAwesomeIcon icon={faThumbtack} style={{color: "#74C0FC"}} className='text-xl cursor-pointer' />
                </div>

                <div className='flex justify-end items-center gap-2'>
                    <div>
                    <FontAwesomeIcon icon={faThumbtack} style={{color: "#74C0FC"}} className='text-xl cursor-pointer' />
                    </div>
                    <div>
                    <FontAwesomeIcon icon={faThumbtack} style={{color: "#74C0FC"}} className='text-xl cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteCard