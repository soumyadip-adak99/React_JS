import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getUserById = (id) => API.get(`/data/get-by/${id}`)
export const apiGetAllUsers = () => API.get('/data/get-all/users')
export const apiGetAllBlogs = () => API.get('/data/getAll/blogs')

