import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CreateTaskForm from './createTaskForm'

type Props = {}

const CreateTask = (props: Props) => {

    return (
        <div className="w-full mx-auto ">
            <SessionProvider>
                <CreateTaskForm ></CreateTaskForm>
            </SessionProvider>
        </div>
    )
}

export default CreateTask