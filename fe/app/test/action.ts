"use server"
import { z } from "zod";
import { AxiosError } from "axios";
import fs from "fs/promises";

const formSchema = z.object({

})

export const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            thumbnail: formData.get("thumbnail"),
        };
        const img = formValues.thumbnail as File;
        const buffer = await img.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);
        await fs.writeFile(img.name, imageBuffer);

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