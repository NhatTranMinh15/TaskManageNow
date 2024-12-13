import { TaskParamModel } from "@/app/models/Task"
import { getURLParams } from "./GeneralUtils"

export const getTaskUrlParams = async (params?: Promise<TaskParamModel>) => {
    const searchParams = await getURLParams(params);
    return searchParams as TaskParamModel;
}