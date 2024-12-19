'use client'
import "@/public/css/color.css";
import { useActionState } from "react";
import InputSection from "./InputSection";
import SelectSection from "./SelectSection";
import { handleFormSubmit } from "@/app/actions/task";

type Props = {}

const CreateTask = (props: Props) => {
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {});
    const errors = state?.error || {}
    return (
        <div className="w-full mx-auto ">
                <form action={formAction} className="w-full p-6 border-2 border-traditional-forest-green rounded-lg dark:text-white-smoke">
                    <legend className="text-2xl font-bold mb-4">Create New Task</legend>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="basis-2/3 min-w-60 min-h-60">
                            <InputSection ></InputSection>
                        </div>
                        <div className="basis-1/3 min-w-60 min-h-60" >
                            <SelectSection state={state} ></SelectSection>
                        </div>
                    </div>
                    <button type="submit" className="mt-[15px] button button-green">
                        Create Task
                    </button>
                </form>
        </div>
    )
}

export default CreateTask