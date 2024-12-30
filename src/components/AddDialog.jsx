import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const top100Films = [
    { title: 'Music' },
  ]

  return (
    <React.Fragment >
      <Button onClick={handleClickOpen}>
        <div className='p-3 rounded-full bg-sky-300 w-[100px] h-[100px] flex justify-center items-center'>
            <FontAwesomeIcon icon={faPlus} className='text-4xl ' />
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
            style: { width: '80%' },
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
        
      >
        <DialogTitle>Craft your memo</DialogTitle>
        <DialogContent>
            <div className='mb-3' >
                <TextField
                autoFocus
                required
                label="Title"
                type="text"
                fullWidth
                variant="standard"
            />
            </div>
          
            <div className='mb-3 '>
            <TextField
            required
                id="standard-multiline-flexible"
                label="Content"
                multiline
                maxRows={10}
                variant="standard"
                className='w-full'

            />
            </div>

                    <Stack spacing={3} sx={{ width: '100%' }}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                // defaultValue={[top100Films[13]]}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Tag"
                    placeholder="Favorites"
                    
                />
                )}
            />
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}