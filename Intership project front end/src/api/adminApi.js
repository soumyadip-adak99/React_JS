import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getAllUsers = () => API.get('/admin/users');
export const getAllBlogs = () => API.get('/admin/blogs');
export const deleteUser = (id) => API.delete(`/admin/users/${id}`)

export const deleteBlog = (id) => API.delete(`/admin/blogs/${id}`)