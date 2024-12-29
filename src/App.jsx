import './index.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

const router = <>
  <Router>
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  </>

function App() {
  return <div>{router}</div>
}

export default App
