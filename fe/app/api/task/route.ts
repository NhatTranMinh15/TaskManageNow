import { Page, SearchPageableModel } from '@/app/models/General';
import { TaskModel } from '@/app/models/Task';
import axiosInstance from '@/utils/axiosUtils';

export async function fetchTasks(pageable: SearchPageableModel) {
    const response = await axiosInstance.get(`/tasks`);    
    const data:Page<TaskModel> = await response.data;
    return data;
}
