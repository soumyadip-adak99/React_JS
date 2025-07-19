import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/app/blog/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loggedUserBlogs = ()=> API.get('/user/blogs')