"use server"
import { z } from "zod";
import { CreateTaskModel, Priority, Status } from "@/app/models/Task";
import { createTask } from "@/app/api/task/route";
import { AxiosError } from "axios";

const formSchema = z.object({
    summary: z.string().min(1, "Summary must not be empty"),
    description: z.string(),
    priority: z.string().min(1, "Priority must not be empty"),
    status: z.string().min(1, "Status must not be empty"),
    dueDate: z.coerce.date().optional().or(z.literal('')),
    assignee: z.string().uuid("Wrong format. Must be UUID").optional().or(z.literal('')),
})

export const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            summary: formData.get("summary"),
            description: formData.get("description"),
            priority: formData.get("priority"),
            status: formData.get("status"),
            dueDate:formData.get("dueDate"),
            assignee: formData.get("assignee"),
        }
        const parseForm = await formSchema.parseAsync(formValues);

        const task: CreateTaskModel = {
            summary: parseForm.summary,
            description: parseForm.description,
            priority: parseForm.priority as Priority,
            status: parseForm.status as Status,
            assignee: parseForm.assignee,
            dueDate:parseForm.dueDate?.toString()
        }

        const response = await createTask(task);
        
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