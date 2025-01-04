import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import NoteCard from "../../components/NoteCard";
import AddDialog from "../../components/AddDialog";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Home = () => {
  const [userInfo, setuserInfo] = useState(null);
  const navigate = useNavigate();
  const getuserInfo = async () => {
    try {
      await axiosInstance.get("/api/notes/user/info").then((res) => {
        setuserInfo(res.data.data);
      });
    } catch (e) {
      if (e.response) {
        if (e.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }else{
        console.log(e.response);
      }
    }
  };

  const [Notes, setNotes] = useState([]);
  const getNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes");
      setNotes(response.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  // const loading = () => {
  //   setNotes(null);
  // }

  // setTimeout(() => {
  //   if (!Notes || Notes.length === 0) loading();
  // }, 3000);

  useEffect(() => {
    getuserInfo();
    getNotes();
    return () => {};
  }, []);

  const skeleton = [1, 2, 3, 4, 5, 6,7,8,9];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav userInfo={userInfo} />
      {Notes && Notes.length === 0 && ( 
        <div className="my-5 mx-auto w-[95%] lg:w-[80%] grid lg:grid-cols-3 sm:grid-cols-2 gap-3 transition-all">
          {skeleton.map((s) => (
            <div key={s}>
                <Skeleton
                  sx={{ bgcolor: "grey.500" }}
                  variant="rectangular"
                  width='100%'
                  height='140px'
                />
            </div>
          ))}
        </div>
      )}
{/* 
      {Notes === null &&  (
            <div className="text-center mt-5">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h1 className="text-4xl font-bold">No Notes Found</h1>
            <p className="text-lg text-gray-500">
              Create a new note to get started
            </p>
          </div>
        </div>
      )} */}

      <div className="my-5 mx-auto w-[95%] lg:w-[80%] grid lg:grid-cols-3 sm:grid-cols-2 gap-3 transition-all">
        {Notes && Notes.map((note) => (
          <div key={note._id}>
            <NoteCard
              id={note._id}
              title={note.title}
              date={{
                day: moment(note.created_at).format("Do MMMM YYYY"),
                time: moment(note.created_at).format("h:mm:ss a"),
              }}
              content={note.content}
              tags={note.tags}
              getNotes={getNotes}
              isPinned={note.isPinned}
              className="w-[300px]"
            />
          </div>
        ))}
      </div>
      <div className="fixed bottom-5 right-5">
        <AddDialog getNotes={getNotes} />
      </div>
    </div>
  );
};

export default Home;
