import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

import Nav from './Nav'

const Login = () => {
const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const navigate = useNavigate();

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

const handleMouseUpPassword = (event) => {
  event.preventDefault();
};

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorEmail, setErrorEmail] = useState('');
const [errorPassword, setErrorPassword] = useState('');

const handleLogin = async (e) => {    
    e.preventDefault();
    setErrorEmail('')
    setErrorPassword('')

    try{
      const response = await axiosInstance.post('/api/auth/login', {email, password})
      if (response.data.Token){
        localStorage.setItem('token', response.data.Token)
        navigate('/');
      }

    }catch(error){
        if(error.response.data.errors.email) setErrorEmail(error.response.data.errors.email)
        if(error.response.data.errors.password) setErrorPassword(error.response.data.errors.password)
    }
}

return (
    <div>
        <Nav/>
        <form className="flex justify-center items-center h-screen shadow-sm" onSubmit={handleLogin}> 
            <div className='shadow-md p-5 border border-sky-600 rounded-md'>
            <h1 className='mb-5 text-2xl'>Login to Record your Daily</h1>
            <div className="mb-5">
                <TextField id="standard-basic" label="Email" variant="standard" className='w-full' value={email} onChange={(e) => setEmail(e.target.value)}/>
                {errorEmail && <p className='text-red-500 text-xs'>{errorEmail}</p>}
            </div>

            <div className='mb-5'>
            <FormControl variant="standard" className='w-full'>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                className='w-full'
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
            </FormControl>
            {errorPassword && <p className='text-red-500 text-xs'>{errorPassword}</p>}
            </div>
            
        <div className='text-center'>
        <Button variant="outlined" className='w-full' type='submit'>Login</Button>
        </div>

                <div className='text-center my-3'>
                    Or
                </div>

                <div className='text-center'>   
                    Haven&apos;t got an account yet?
                    <Link to='/signup' className='text-sky-600 hover:text-sky-500 ml-1 underline'>Get one</Link>
                </div>
            </div>
        </form>
    </div>
    
  )
}
export default Login