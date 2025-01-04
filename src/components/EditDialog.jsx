import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import axiosInstance from "../utils/axiosInstance";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function FormDialog({
  id,
  oldTitle,
  oldContent,
  oldTags,
  getNotes,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (oldTitle) setTitle(oldTitle);
    if (oldContent) setContent(oldContent);
    if (oldTags) {
      const tags = oldTags.map((e) => ({ title: e }));
      setTags(tags);
    }
    console.log(tags);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const taglist = [
    { title: "Music" },
    { title: "Work" },
    { title: "Personal" },
    { title: "Learning" },
    { title: "Ideas" },
    { title: "High Priority" },
    { title: "Medium Priority" },
    { title: "Low Priority" },
    { title: "Today" },
    { title: "This Week" },
    { title: "This Month" },
    { title: "Long-Term" },
    { title: "Todo" },
    { title: "In Progress" },
    { title: "Completed" },
    { title: "Archived" },
    { title: "Text" },
    { title: "Image" },
    { title: "Audio" },
    { title: "Video" },
    { title: "Happy" },
    { title: "Motivated" },
    { title: "Stressed" },
    { title: "Reflective" },
    { title: "Home" },
    { title: "Work" },
    { title: "Travel" },
    { title: "Meeting" },
    { title: "Birthday" },
    { title: "Appointment" },
    { title: "Technology" },
    { title: "Health" },
    { title: "Finance" },
    { title: "Education" },
    { title: "ProjectAlpha" },
    { title: "JapanTrip" },
    { title: "Recurring" },
    { title: "One-Time" },
    { title: "Red" },
    { title: "Blue" },
    { title: "Green" },
    { title: "Yellow" },
    { title: "Shared" },
    { title: "Private" },
    { title: "Team" },
    { title: "English" },
    { title: "Japanese" },
    { title: "French" },
    { title: "Mobile" },
    { title: "Desktop" },
    { title: "Web" },
    { title: "Music" },
    { title: "Movies" },
    { title: "Valentine's Day" },
    { title: "New Year" },
    { title: "Christmas" },
    { title: "Anniversary" },
    { title: "Holiday" },
    { title: "Event" },
    { title: "Special Day" },
    { title: "Concert" },
    { title: "Festival" },
  ];

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [tags, setTags] = useState([]);

  const handlePost = async () => {
    try {
      const tagArray = tags.map((e) => e.title);
      const res = await axiosInstance.put(`/api/notes/update/${id}`, {
        title,
        content,
        tags: tagArray,
      });
      if (res.data && res.data.data) {
        getNotes();
      }
      setTitle("");
      setContent("");
      setTags([]);
    } catch (e) {
      setTitle("");
      setContent("");
      setTags([]);
      console.log(e.response);
    }
  };

  return (
    <React.Fragment>
      <button onClick={handleClickOpen}>
        <Tooltip title="Delete">
          <IconButton>
            <FontAwesomeIcon
              icon={faPen}
              className=" hover:scale-125 transition-all text-md"
            />
          </IconButton>
        </Tooltip>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { width: "80%" },
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handlePost();
            handleClose();
          },
        }}
      >
        <DialogTitle>Craft your memo</DialogTitle>
        <DialogContent>
          <div className="mb-3">
            <TextField
              autoFocus
              required
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3 ">
            <TextField
              required
              id="standard-multiline-flexible"
              label="Content"
              multiline
              maxRows={10}
              variant="standard"
              className="w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <Stack spacing={3} sx={{ width: "100%" }}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={taglist}
              getOptionLabel={(option) => option.title}
              value={tags}
              onChange={(e, value) => setTags(value)}
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
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
