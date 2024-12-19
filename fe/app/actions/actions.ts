'use server'
import { AxiosError } from "axios";
import { z } from "zod";

export async function zodWrapper(prevState: any, formValues: any, formSchema: any) {
    try {
        const parsedValues = await formSchema.parseAsync(formValues);
        return parsedValues
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors = error.flatten().fieldErrors;
            return { ...prevState, error: fieldErrors, status: "ERROR" }
        }
        return { ...prevState, error: { error: "Unexpected error occured" }, status: "ERROR" }
    }
}

export const postWrapper = async (prevState: any, cb: () => any) => {
    try {
        const result = await cb();
        return { ...prevState, error: null, status: "COMPLETED" }
    } catch (error) {
        if (error instanceof AxiosError) {
            const fieldErrors = error.message
            return { ...prevState, error: fieldErrors, status: "ERROR" }
        }
        return { ...prevState, error: { error: "Unexpected error occured" }, status: "ERROR" }
    }
}