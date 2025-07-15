import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getUserDetails = () => API.get('/api/user');
export const userLogout = () => API.post('/api/user/log-out')