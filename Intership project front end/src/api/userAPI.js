import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const getUserDetails = () => API.get('/api/user');
export const userLogout = () => API.post('/api/user/log-out')

export const uploadProfileImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await API.post('/api/user/upload-profile-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading profile image:', error);
        throw error;
    }
};