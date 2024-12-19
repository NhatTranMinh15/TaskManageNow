"use server"
import { z } from "zod";
import { postWrapper, zodWrapper } from "./actions";
import { get, post } from "@/utils/axiosUtils";
import { Comment, CreateCommentModel } from "../models/Comment";
import { Page } from "../models/General";

const formSchema = z.object({
    parentId: z.string(),
    content: z.optional(z.string().min(1, "Comment must not be empty"))
})

export const handleFormSubmit = async (prevState: any, formData: FormData, postUrl: string, callbackUrl?: string) => {
    const formValues = {
        parentId: formData.get('parentId'),
        content: formData.get('content')
    }
    const parsedValues: CreateCommentModel = await zodWrapper(prevState, formValues, formSchema);
    return await postWrapper(prevState, async () => { await createComment(parsedValues, postUrl, callbackUrl) })
}

export const createComment = async (data: CreateCommentModel, postUrl: string, callbackUrl?: string) => {
    const result = await post(postUrl, data, callbackUrl);
    return result
}
export async function getCommentOfBlog(blogId: string, slug: string) {
    const result: Page<Comment> = await get(`/blogs/comments/${blogId}`, `/blog/${slug}`);
    return result;
}