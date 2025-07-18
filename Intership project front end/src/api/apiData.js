import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

