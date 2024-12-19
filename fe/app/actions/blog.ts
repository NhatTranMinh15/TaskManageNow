"use server"
import { z } from "zod";
import { AxiosError } from "axios";
import { createBlog } from "@/app/api/blog/route";
import { categories, CreateBlogModel } from "@/app/models/Blog";

const formSchema = z.object({
    title: z.string().min(1),
    preview: z.string(),
    categories: z.array(z.string().uuid()).or(z.array(z.literal(''))),
    content: z.string().min(1)
})

export const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const categories = formData.get('categories')?.toString().split(",");
        const formValues = {
            title: formData.get('title'),
            preview: formData.get('preview'),
            categories: categories,
            content: formData.get('content')
        }
        const parsedValues: CreateBlogModel = await formSchema.parseAsync(formValues);
        const result = await createBlog(parsedValues);
        return { ...prevState, error: null, status: "COMPLETED" }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors = error.flatten().fieldErrors;
            return { ...prevState, error: fieldErrors, status: "ERROR" }
        }
        if (error instanceof AxiosError) {
            const fieldErrors = error.message
            return { ...prevState, error: fieldErrors, status: "ERROR" }
        }
        return { ...prevState, error: { error: "Unexpected error occured" }, status: "ERROR" }
    } finally {

    }
}