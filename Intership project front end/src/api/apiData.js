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

export const getUserById = (id) => API.get(`/data/get-by/${id}`)
export const apiGetAllUsers = () => API.get('/data/get-all/users')
export const apiGetAllBlogs = () => API.get('/data/getAll/blogs')

