import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditDialog from './EditDialog'
import axiosInstance from '../utils/axiosInstance';
import { useState } from 'react';

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

const NoteCard = ({id, title, date, content, tags, isPinned,getNotes}) => {
    const handleDelete = async () => {
        await axiosInstance.delete(`/api/notes/delete/${id}`);
        getNotes();
    }

      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

        const [Pinned, setPinned] = useState(isPinned);
      const handlePin= async()=>{
        try{
            if (Pinned === true){
                await axiosInstance.patch(`/api/notes/ispinned/${id}`, {isPinned: "false"});
                setPinned(false);    
                getNotes();            
            }else{
                await axiosInstance.patch(`/api/notes/ispinned/${id}`, {isPinned: "true"});
                setPinned(true);
                getNotes();
            }
        }catch(e){
            console.log(e.response);
        }
        
      }
  return (
    <div>
        <div className='flex justify-between border border-sky-500 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer h-[140px]'>        
            <div onClick={() => {
                handleOpen();
                }}>
                <div className='font-bold text-xl'>{title.length > 20 ? title.slice(0, 20) + '...' : title}</div>
                <div className='text-xs'>{date.day}</div>
                <div className='text-xs'>{date.time}</div>
                <div>{content.length > 20 ? content.slice(0, 20) + '...' : content}</div>
                <small className='flex flex-wrap items-center justify-start'>
                {tags.map((tag,index)=><span key={index} className='text-blue-500 mr-1'>#{tag}</span>)}
                </small>
                
            </div>

            <div className='flex flex-col justify-between items-end'>
                <div>
                <Tooltip title={Pinned === true ? 'Unpin' : 'Pin'}>
                        <IconButton onClick={handlePin}>
                        <FontAwesomeIcon icon={faThumbtack} style={{color: "#74C0FC"}} className={`text-xl hover:scale-125 transition-all ${Pinned === true && 'rotate-90'}`}/>
                        </IconButton>
                    </Tooltip>
                    
                </div>

                <div className='flex justify-end items-center gap-3'>
                    <EditDialog
                        id={id}
                        oldTitle={title}
                        oldContent={content}
                        oldTags={tags}
                        getNotes={getNotes}
                    />
                    <div onClick={handleDelete}>
                    <Tooltip title="Delete">
                        <IconButton>
                        <FontAwesomeIcon icon={faTrash} className='text-red-500 hover:scale-125 transition-all text-md' />
                        </IconButton>
                    </Tooltip>
                    </div>
                </div>
            </div>
        </div>
        <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropProps={{
                style: { backgroundColor: "rgba(0, 0, 0, 0.3)" }, // Slightly dark semi-transparent background
              }}
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
              
            >
              <Fade in={open}>
                <Box sx={style} className="bg-sky-50 rounded-md border border-sky-500 p-5 h-[80%] w-[80%] lg:w-1/2 md:w-8/12 overflow-auto">
                <div className="max-h-[70vh] overflow-auto  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-sky-100
                [&::-webkit-scrollbar-thumb]:bg-sky-300
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <div className="text-xs">{date.day}</div>
                    <div className="text-xs">{date.time}</div>
                    <p className="mt-3">{content}</p>
                </div>
                </Box>
              </Fade>
            </Modal>
    </div>
  )
}

export default NoteCard