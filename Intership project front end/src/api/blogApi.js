import axios from "axios";

const API = axios.create({
    baseURL: 'https://codescribe-ai-v1.onrender.com/app/blog/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }
    return config;
}, error => {
    return Promise.reject(error);
});

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

