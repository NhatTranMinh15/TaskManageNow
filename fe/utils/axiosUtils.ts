import { auth, signIn } from '@/auth';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

const baseUrl = "http://localhost:15000/api/v1"

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(async (config) => {
    const session = await auth();    
    
    if (session) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {        
        if (error instanceof AxiosError) {
            if (error.status === 401) {
                return Promise.reject(redirect("/api/auth/signout"));
            }
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;
