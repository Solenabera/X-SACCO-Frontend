import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axios';
import { UserContext } from '../providers/userProvider';

const useAxiosInterceptor = () => {
    const navigate = useNavigate();
    const { setUser, clearStorage } = useContext(UserContext);

    useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    const requestUrl = error.config?.url || '';
                    const errorMessage = error.response.data?.message || '';

                    const isLoginRequest = requestUrl.includes('/login') || requestUrl.includes('/login_user');
                    const isSessionError = 
                        errorMessage === 'Invalid or expired session.' || 
                        errorMessage === 'Not Authorized. Please login again!' ||
                        errorMessage === 'Session expired due to inactivity. Please log in again.' ||
                        errorMessage === 'Maximum session time reached. For security, please log in again.';

                    if (!isLoginRequest || isSessionError) {
                        setUser(null);
                        clearStorage();
                        navigate('/login');
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, setUser, clearStorage]);
};

export default useAxiosInterceptor;
