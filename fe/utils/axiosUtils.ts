import { auth, signIn } from '@/auth';
import axios, { AxiosError, AxiosHeaders } from 'axios';
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

const callApi = async (cb: () => any, callbackUrl?: string) => {
    try {
        const response = await cb();
        const data = await response.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.status === 401) {
                callbackUrl = callbackUrl !== undefined ? callbackUrl : '';
                return redirect(`/api/auth/signin?callbackUrl=${process.env.BASE_URL}${callbackUrl}`);
            }
        }
    }
    return {}
}
export const get = async (url: string, callbackUrl?: string) => {
    return callApi(async () => { return await axiosInstance.get(url) }, callbackUrl)
}
export const post = async (url: string, body: any, callbackUrl?: string) => {
    return callApi(async () => { return await axiosInstance.post(url, body) }, callbackUrl)
}

export default axiosInstance;
