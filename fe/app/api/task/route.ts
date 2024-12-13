import { emptyPage, Page } from '@/app/models/General';
import { CreateTaskModel, TaskModel, TaskParamModel } from '@/app/models/Task';
import axiosInstance from '@/utils/axiosUtils';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export async function fetchTasks(params: TaskParamModel): Promise<Page<TaskModel>> {
    const parseParams = new URLSearchParams(params as any).toString();
    try {
        const response = await axiosInstance.get(`/tasks?${parseParams}`);
        const data: Page<TaskModel> = await response.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.status === 401) {
                return redirect(`/api/auth/signin?callbackUrl=${process.env.BASE_URL}/task?${parseParams}`);
            }
        }
    }
    return emptyPage
}
export async function getOneTask(id: string): Promise<TaskModel> {
    try {
        const response = await axiosInstance.get(`/tasks/${id}`);
        const data:TaskModel = await response.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.status === 401) {
                return redirect(`/api/auth/signin?callbackUrl=${process.env.BASE_URL}/task/${id}`);
            }
        }
    }
    return {} as TaskModel
}
export async function createTask(task: CreateTaskModel) {
    const response = await axiosInstance.post(`/tasks`, task);
    const data: TaskModel = await response.data;
    return data;
}