import axios from "axios";

const API = axios.create({
    baseURL: 'https://codescribe-ai-v1.onrender.com/app/blog',
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

export const addNewBlog = (blogData, file) => {
    const formData = new FormData();
    formData.append('blog', new Blob([JSON.stringify(blogData)], {
        type: 'application/json'
    }));

    if (file) {
        formData.append('file', file);
    }

    return API.post('/add-new-blog', formData, {
        headers: {
            'Accept': 'application/json'
        }
    });
};


export const userBlogDeleteById = async (id) => {
    return API.delete(`/delete-blog/${id}`);
}

export const userBlogUpdateById = async (id, data) => {
    return API.put(`/edit/blog/${String(id)}`, data);
}

