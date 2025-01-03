import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import NoteCard from "../../components/NoteCard";
import AddDialog from "../../components/AddDialog";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const [userInfo, setuserInfo] = useState(null);
  const navigate = useNavigate();
  const getuserInfo = async () => {
    try {
      await axiosInstance.get("/api/notes/user/info").then((res) => {
        setuserInfo(res.data.data);
      });
    } catch (e) {
      if(e.response.status === 401){
        localStorage.clear();
        navigate('/login')
      }
    }
  }

    useEffect(() => {
      getuserInfo();
      return () => {};
    }, []);

    return (
      <div className="bg-gray-50 min-h-screen">
        <Nav userInfo={userInfo}/>

        <div className="my-5 mx-auto w-[95%] lg:w-[80%] grid sm:grid-cols-3 gap-3">
          <NoteCard
            title="Testing"
            date="3/9/2024"
            content="lorem sfsdfs....."
            tag="test"
          />
        </div>

        <div className="fixed bottom-5 right-5">
          <AddDialog />
        </div>
      </div>
    );
  };


export default Home;
