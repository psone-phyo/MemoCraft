import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import NoteCard from "../../components/NoteCard";
import AddDialog from "../../components/AddDialog";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import noNotesImage from '../../assets/noNotes.png'
import noConnection from '../../assets/noConnection.png'


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
  const [status, setStatus] = useState("loading");
  const getNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes");
      setNotes(response.data.data);
      setStatus("success");
    } catch (e) {
      if (e.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
      setStatus("failed");
    }
  };

  useEffect(() => {
    getuserInfo();
    getNotes();
    return () => {};
  }, []);

  const skeleton = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12];

  return (
    <div className={`min-h-screen ${status === 'success' && Notes.length > 0 ? 'bg-gray-50' : ''}`}>
      <Nav userInfo={userInfo} />
      {status === "loading" && ( 
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

      {status === "success" && Notes.length===0 &&  (
            
        <div className="text-center mt-5">
        <div className="flex flex-col items-center justify-center h-[60vh]">
            <img src={noNotesImage} alt="No Notes" width={250} />
          <h1 className="text-4xl font-bold">No Notes Found</h1>
          <p className="text-lg text-gray-500">
            Create a new note to get started
          </p>
        </div>  
      </div>
      )}

      {status === 'failed' && (
        <div className="text-center mt-5">
        <div className="flex flex-col items-center justify-center h-[60vh]">
            <img src={noConnection} alt="No Notes" width={250} />
          <h1 className="text-4xl font-bold">Connection Lost</h1>
          <p className="text-lg text-gray-500">
            Check your connection please!
          </p>
        </div>  
      </div>
      )}

      <div className="my-5 mx-auto w-[95%] lg:w-[80%] grid lg:grid-cols-3 sm:grid-cols-2 gap-3 transition-all">
        {Notes && Notes.length > 0 && Notes.map((note) => (
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
