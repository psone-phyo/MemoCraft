import React,  { useState } from 'react'
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
import Nav from './Nav'
import axiosInstance from '../../utils/axiosInstance'

const Signup = () => {

const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

const handleMouseUpPassword = (event) => {
  event.preventDefault();
};

const navigate = useNavigate();

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setconfirmPassword] = useState('');
const [errorEmail, setErrorEmail] = useState('');
const [errorPassword, setErrorPassword] = useState('');
const [errorName, setErrorName] = useState('');
const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  
const handleLogin = async (e) => {    
    e.preventDefault();
    setErrorName('')
    setErrorEmail('')
    setErrorPassword('')  
    setErrorConfirmPassword('')

      try{
        const response = await axiosInstance.post('/api/auth/register', {name,email, password, confirmPassword})
        if (response.data.Token){
          localStorage.setItem('token', response.data.Token)
          navigate('/');
        }
  
      }catch(error){
        if(error.response.data.errors){
          error.response.data.errors.slice().reverse().map((e)=>{
            if (e.path === 'name') setErrorName(e.msg)
            if (e.path === 'email') setErrorEmail(e.msg)
            if (e.path === 'password') setErrorPassword(e.msg)
            if (e.path === 'confirmPassword') setErrorConfirmPassword(e.msg)
          })

          console.log(error.response);
          
        }else{
          console.log(error.response);
        }
        
      }
} 


  return (
    <div>
        <Nav/>
        <form className="flex justify-center items-center h-screen shadow-sm" onSubmit={handleLogin}> 
            <div className='shadow-md p-5 border border-sky-600 rounded-md'>
            <h1 className='mb-5 text-2xl'>Signup to Record your Daily</h1>

            <div className="mb-5">
                <TextField id="standard-basic2" label="Name" variant="standard" className='w-full' value={name} onChange={(e) => setName(e.target.value)}/>
                {errorName && <p className='text-red-500 text-xs'>{errorName}</p>}
            </div>

            <div className="mb-5">
                <TextField id="standard-basic" label="Email" variant="standard" className='w-full' value={email} onChange={(e) => setEmail(e.target.value)}/>
                {errorEmail && <p className='text-red-500 text-xs'>{errorEmail}</p>}
            </div>

            <div className='mb-5'>
            <FormControl variant="standard" className='w-full'>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                className='w-full'
            id="standard-adornment-password1"
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
            
            <div className='mb-5'>
            <FormControl variant="standard" className='w-full'>
                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                <Input
                className='w-full'
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}
          />
            </FormControl>
            {errorConfirmPassword && <p className='text-red-500 text-xs'>{errorConfirmPassword}</p>}
            </div>

        <div className='text-center'>
        <Button variant="outlined" className='w-full' type='submit'>Sign Up</Button>
        </div>

                <div className='text-center my-3'>
                    Or
                </div>

                <div className='text-center'>   
                    <Link to='/login'>
                        Already got an account?
                        <Link to='/login' className='text-sky-600 hover:text-sky-500 ml-1 underline'>Log in</Link>
                    </Link>
                </div>
            </div>
        </form>
        
    </div>
    
  )
}

export default Signup