import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export const sentOtp = (request) =>
    API.post('/api/public/send-otp', request)

export const register = (request) =>
    API.post('/api/public/register', request)

export const login = (data) =>
    API.post('/api/public/login', data)

export const resetPassword = (data) =>
    API.post('/api/public/reset-password', data);
