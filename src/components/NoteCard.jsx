import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const NoteCard = ({title, date, content, tag}) => {
  return (
    <div>
        <div className='flex justify-between border border-sky-500 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer'>
            <div>
                <div className='font-bold text-xl'>{title}</div>
                <div>{date}</div>
                <div>{content}</div>
                <div className='font-bold'>#{tag}</div>
            </div>

            <div className='flex flex-col justify-between items-end'>
                <div>
                <FontAwesomeIcon icon={faThumbtack} style={{color: "#74C0FC"}} className='text-xl hover:scale-125 transition-all' />
                </div>

                <div className='flex justify-end items-center gap-2'>
                    <div>
                    <FontAwesomeIcon icon={faPen} className='hover:scale-125 transition-all'/>
                    </div>
                    <div>
                    <FontAwesomeIcon icon={faTrash} className='text-red-500 hover:scale-125 transition-all' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteCard