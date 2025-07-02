import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const api = axios.create({
    baseURL: "http://localhost:8080/app",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Helper function to extract roles from JWT token
    const extractRolesFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            let roles = [];

            if (decoded.authorities) {
                if (typeof decoded.authorities === 'string') {
                    try {
                        roles = JSON.parse(decoded.authorities);
                        if (Array.isArray(roles) && Array.isArray(roles[0])) {
                            roles = roles[0];
                        }
                    } catch (e) {
                        const match = decoded.authorities.match(/ROLE_\w+/g);
                        roles = match || [];
                    }
                } else if (Array.isArray(decoded.authorities)) {
                    roles = decoded.authorities;
                }
            } else if (decoded.roles) {
                roles = Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles];
            }

            return roles;
        } catch (e) {
            console.error('Error extracting roles from token:', e);
            return [];
        }
    };

    // Check if token is valid
    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        } catch (e) {
            return false;
        }
    };

    // Clear error state
    const clearError = useCallback(() => setError(null), []);

    // Fetch user details from API
    const fetchUserDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get("/user");
            return response.data;
        } catch (err) {
            console.error("Failed to fetch user details:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Handle successful authentication response
    const handleAuthResponse = useCallback(async (response, shouldRedirect = true) => {
        if (response.data?.token) {
            localStorage.setItem('authToken', response.data.token);

            try {
                // Get fresh user details from API
                const userDetails = await fetchUserDetails();
                const roles = extractRolesFromToken(response.data.token);

                const userData = {
                    ...userDetails,
                    roles,
                    exp: jwtDecode(response.data.token).exp
                };

                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);

                if (shouldRedirect) {
                    navigate('/');
                }

                return userData;
            } catch (error) {
                console.error('Error handling auth response:', error);
                throw error;
            }
        }
        return null;
    }, [fetchUserDetails, navigate]);

    // Initialize user state
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("authToken");
            const storedUser = localStorage.getItem("user");

            if (token && isTokenValid(token)) {
                try {
                    // Get fresh user details on app load
                    const userDetails = await fetchUserDetails();
                    const roles = extractRolesFromToken(token);

                    const userData = {
                        ...userDetails,
                        roles,
                        exp: jwtDecode(token).exp
                    };

                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                } catch (error) {
                    console.error('Auth initialization error:', error);
                    await logout();
                }
            }
        };

        initializeAuth();
    }, [fetchUserDetails]);

    // Login method
    const login = async (email, password) => {
        try {
            setLoading(true);
            clearError();
            const response = await api.post("/api/public/login", {
                email: email.trim(),
                password: password
            });

            return await handleAuthResponse(response);
        } catch (err) {
            const errorData = err.response?.data || {};
            setError({
                message: errorData.message || "Login failed",
                details: errorData
            });
            throw errorData;
        } finally {
            setLoading(false);
        }
    };

    // Register method
    const register = async (userData) => {
        try {
            setLoading(true);
            clearError();
            const response = await api.post("/api/public/register", {
                firstname: userData.firstname.trim(),
                lastname: userData.lastname.trim(),
                email: userData.email.trim(),
                password: userData.password,
                phone_number: userData.phone_number,
                otp: userData.otp
            });

            // Don't redirect automatically after registration
            return await handleAuthResponse(response, false);
        } catch (err) {
            const errorData = err.response?.data || {};
            setError({
                message: errorData.message || "Registration failed",
                details: errorData
            });
            throw errorData;
        } finally {
            setLoading(false);
        }
    };

    // Logout method
    const logout = useCallback(async () => {
        try {
            await api.post("/api/public/logout");
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
            navigate('/auth/sign-in');
        }
    }, [navigate]);

    // Check authentication status
    const isAuthenticated = useCallback(() => {
        const token = localStorage.getItem('authToken');
        return !!user && !!token && isTokenValid(token);
    }, [user]);

    // Check if user is admin
    const isAdmin = useCallback(() => {
        return user?.roles?.includes("ROLE_ADMIN");
    }, [user]);

    // Check if user is regular user
    const isUser = useCallback(() => {
        return user?.roles?.includes("ROLE_USER");
    }, [user]);

    // Set up axios interceptors
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            async (config) => {
                const token = localStorage.getItem('authToken');
                if (token && isTokenValid(token)) {
                    config.headers.Authorization = `Bearer ${token}`;
                } else if (user) {
                    await logout();
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401 && user) {
                    await logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [logout, user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                clearError,
                isAuthenticated,
                isAdmin,
                isUser,
                fetchUserDetails,
                api
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};