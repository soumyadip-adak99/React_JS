import axios from "axios";

const API = axios.create({
    baseURL: 'https://codescribe-ai-v1.onrender.com/app',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle 401 errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jwtToken');
            window.location.href = '/auth/sign-in';
        }
        return Promise.reject(error);
    }
);

export default API;

// Public endpoints
export const sentOtp = (request) => API.post('/api/public/send-otp', request);
export const register = (request) => API.post('/api/public/register', request);
export const login = (data) => API.post('/api/public/login', data);
export const resetPassword = (data) => API.post('/api/public/reset-password', data);
export const totalNumberOfUser = () => API.get('/api/public/total-user');
export const totalNumberOfBlogs = () => API.get('/api/public/total-blogs');

// Protected endpoints (examples)
export const getUserDetails = () => API.get('/api/user/details');
export const userLogout = () => API.post('/api/user/logout');