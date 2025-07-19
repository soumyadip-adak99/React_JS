import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { getUserDetails as apiGetUserDetails, userLogout as apiLogout, uploadProfileImage } from '../api/userAPI';
import { login as apiLogin, sentOtp as apiSentOTP, register as apiRegister, resetPassword } from '../api/publicAPI';
import { getAllUsers, getAllBlogs, deleteUser, deleteBlog } from '../api/adminApi'
import toast from "react-hot-toast";
import { getUserById, apiGetAllUsers, apiGetAllBlogs } from "../api/apiData";
import { addNewBlog, userBlogDeleteById } from "../api/blogApi.js";
import { nav } from "framer-motion/client";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Function to clear a cookie
const clearCookie = (name) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;`;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([])
    const [allBlogs, setAllBlogs] = useState([])
    const [currentBlog, setCurrentBlog] = useState(null);
    const navigate = useNavigate();

    // Extract user data from token
    const extractUserFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            let roles = [];

            if (typeof decoded.authorities === 'string') {
                try {
                    roles = JSON.parse(decoded.authorities).flat();
                } catch {
                    roles = [decoded.authorities];
                }
            } else if (Array.isArray(decoded.authorities)) {
                roles = decoded.authorities.flat();
            }

            return {
                email: decoded.sub,
                roles: roles,
                exp: decoded.exp
            };
        } catch (err) {
            console.error('Error extracting user from token:', err);
            return null;
        }
    };

    // Clear authentication state
    const clearAuth = () => {
        clearCookie('jwt');
        setUser(null);
    };

    // Initialize auth state
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await apiGetUserDetails();

                if (response.data) {
                    setUser({
                        email: response.data.email,
                        roles: response.data.roles || []
                    });
                }
            } catch (err) {
                clearAuth();
                throw err;
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // login method
    const login = async (formData) => {
        try {
            const request = {
                email: formData.email,
                password: formData.password
            };

            const response = await apiLogin(request);
            const { email, token } = response.data;

            // Extract user info from token and set user state
            const userData = extractUserFromToken(token);
            if (userData) {
                setUser(userData);
            } else {
                // Fallback to email from response
                setUser({ email: email, roles: [] });
            }

            toast.success('Login successful!');

            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed";
            toast.error(errorMessage);
            console.error('Login error:', err);
            clearAuth();
            throw err;
        }
    };



    // registration method
    const registration = async (formData) => {
        try {
            const request = {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: String(formData.password),
                otp: String(formData.otp)
            };

            const response = await apiRegister(request);
            toast.success('Registration successful.');
            navigate('/auth/sing-in');
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            toast.error(errorMessage);
            console.error("Registration error:", err);
            throw err;
        }
    };

    // reset password 
    const fetchResetPassword = async (data) => {
        try {
            const response = await resetPassword({
                email: data.email,
                newPassword: data.newPassword,
                otp: data.otp
            });
            toast.success("Password reset successfully");
            navigate('/auth/sing-in');
            return response;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Password reset failed");
            throw error;
        }
    }

    // send OTP
    const sentOTP = async (email) => {
        try {
            const request = {
                email: email
            };

            await apiSentOTP(request);
            toast.success('OTP sent successfully');
        } catch (err) {
            const errorMessage = err.response?.data?.message || "OTP send failed";
            toast.error(errorMessage);
            console.error('OTP send error:', err);
            throw err;
        }
    };

    // fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await apiGetUserDetails();
            if (response.data) {
                setUser(prevUser => ({
                    ...prevUser,
                    ...response.data
                }));
                setCurrentBlog(user.blogs)
                //console.log(currentBlog)
                return response.data;
            }
        } catch (err) {
            console.error('Error fetching user details:', err);

            if (err.response?.status === 401) {
                clearAuth();
                navigate('/auth/sign-in');
                toast.error('Session expired. Please login again.');
            } else {
                toast.error('Failed to fetch user details.');
            }

            return null;
        }
    };

    // upload image
    const fetchToProfileImageUpload = async (image) => {
        try {
            const response = await uploadProfileImage(image);
            toast.success('Profile image upload successfully.');
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // logout
    const logout = async () => {
        try {
            await apiLogout();
            toast.success("Logged out successfully");
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setCurrentBlog({})
            clearAuth();
            navigate('/');
        }
    };

    // authentication checks
    const isAuthenticated = () => {
        if (loading) return false;
        return !!user;
    };

    const hasRole = (role) => {
        return user?.roles?.includes(role) || false;
    };

    const isAdmin = () => hasRole('ROLE_ADMIN');
    const isUser = () => hasRole('ROLE_USER');


    /**
     *  admin function
     */

    const getAllUserDetails = async () => {
        try {
            const response = await getAllUsers()
            //toast.success("Successfully fetch user details.")
            return response.data
        } catch (error) {
            console.log(error)
            // toast.error("User details fetching faild")
        }
    }

    const getAllBlogsDetails = async () => {
        try {
            const response = await getAllBlogs()
            return response.data
        } catch (error) {
            console.log('error')
            throw error
        }
    }

    const userDelete = async (id) => {
        try {
            const response = await deleteUser(id);
            toast.success("User deleted successfully")
            return response
        } catch (error) {
            console.log("Error while delete the user: ", error)
            throw error
        }
    }

    const blogDelete = async (id) => {
        try {
            const response = await deleteBlog(id)
            toast.success('Blog deleted successfully')
            return response
        } catch (error) {
            console.log("Error while delete the blog: ", error)
            throw error
        }
    }

    /**
     * API basic response
     */

    const fetchUserDetailsById = async (id) => {
        try {
            console.log(id)
            const response = await getUserById(id);
            console.log(response.data)
            return response.data
        } catch (err) {
            console.error("Error while fetching user by id: ", id, err);
            throw err
        }
    }

    // all user
    const fetchAllUsers = async () => {
        try {
            const response = await apiGetAllUsers()
            setAllUsers(response.data)
        } catch (err) {
            console.log("Error: ", err)
            throw err
        }
    }


    // all blogs
    const fetchAllBlogs = async () => {
        try {
            const response = await apiGetAllBlogs()
            setAllBlogs(response.data)
        } catch (err) {
            console.log("error: ", err)
            throw err
        }
    }

    /**
     * get logged userBlogs
     * */

    const uploadBlog = async (blogData, file) => {
        try {
            const response = await addNewBlog(blogData, file);
            toast.success('Blog uploaded successfully');
            return response.data;
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Failed to upload blog');
            throw error
        }
    }

    const fetchToDeleteBlog = async (id) => {
        try {
            const response = await userBlogDeleteById(id);
            toast.success('Blog deleted successfully');
            return response
        } catch (error) {
            console.log(error)
            throw error;
        }
    }


    const contextValue = {
        user,
        loading,
        isAuthenticated,
        isAdmin,
        isUser,
        hasRole,
        login,
        registration,
        sentOTP,
        logout,
        fetchUserDetails,
        getAllUserDetails,
        getAllBlogsDetails,
        userDelete,
        blogDelete,
        fetchUserDetailsById,
        fetchAllBlogs,
        allUsers,
        allBlogs,
        fetchAllUsers,
        uploadBlog,
        fetchToDeleteBlog,
        fetchToProfileImageUpload,
        fetchResetPassword
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};