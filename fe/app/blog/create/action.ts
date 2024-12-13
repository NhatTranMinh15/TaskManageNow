"use server"
import { z } from "zod";
import { AxiosError } from "axios";

const formSchema = z.object({

})

export const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            title: formData.get("title"),
            thumbnail: formData.get("thumbnail"),
            preview: formData.get("preview"),
            category: formData.get("category"),
            content: formData.get("content"),
        };
        const img = formValues.thumbnail as File;

        const parsedValues = await formSchema.parseAsync(formValues);

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