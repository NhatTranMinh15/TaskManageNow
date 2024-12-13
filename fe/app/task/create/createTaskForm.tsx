'use client'
import { useSession } from "next-auth/react"
import { useActionState, useEffect, useState } from "react";
import { handleFormSubmit } from "./action";
import { Priority, PriorityColor, Status, StatusColor } from "@/app/models/Task";
import Form from 'next/form'
import "@/public/css/color.css";
import UserSelect from "./SelectAssignee";
import InputSection from "./InputSection";
import SelectSection from "./SelectSection";

type Props = {}

const CreateTaskForm = (props: Props) => {
  const session = useSession();
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {});
  const errors = state?.error || {}
  const user_id = session.data?.user?.id || "";

  return (
    <>
      <form action={formAction} className="w-full p-6 border-2 border-traditional-forest-green rounded-lg dark:text-white-smoke">
        <legend className="text-2xl font-bold mb-4">Create New Task</legend>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="basis-2/3  min-w-60 min-h-60">
            <InputSection user_id={user_id} ></InputSection>
            <button type="submit" className="mt-[15px] button button-green">
              Create Task
            </button>
          </div>
          <div className="basis-1/3  min-w-60 min-h-60" >
            <SelectSection state={state} ></SelectSection>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateTaskForm