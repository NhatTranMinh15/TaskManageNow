import { emptyPage, Page } from "@/app/models/General";
import { UserModel } from "@/app/models/User";
import axiosInstance from "@/utils/axiosUtils";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    // const result = await getAllUser(searchParams, `/api/user?${searchParams.toString()}`);
    const result = await getAllUser(searchParams);
    return Response.json(result)
}

export async function getAllUser(params: URLSearchParams, callbackUrl?: string): Promise<Page<UserModel>> {
    try {
        const response = await axiosInstance.get(`/users?${params.toString()}`);
        const data = await response.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (callbackUrl) {
                if (error.status === 401) {
                    return redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`);
                }
            }
        }
    }
    return emptyPage as Page<UserModel>
}

export async function getOneUser(id: string, callbackUrl?: string): Promise<UserModel> {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        const data: UserModel = await response.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (callbackUrl) {
                if (error.status === 401) {
                    return redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`);
                }
            }
        }
    }
    return {} as UserModel
}