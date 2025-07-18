import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/app/blog/',
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


export const userBlogDeleteById = async (id) => API.delete(`/delete-blog/${id}`)

