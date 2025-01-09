import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://memo-craft-api.vercel.app/',
    // timeout: 1000,
    header:{
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;  
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;