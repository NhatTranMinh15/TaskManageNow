import { getOneTask } from '@/app/api/task/route'
import { Priority, PriorityColor, Status, StatusColor } from '@/app/models/Task';
import Link from 'next/link';
import React from 'react'
import Assignee from './Assignee';

type Props = {
   params: Promise<{
        id: string;
    }>;
}

const TaskDetailComponent = async ({ params }: Props) => {
    const { id } = await params;

    const task = await getOneTask(id);
    
    return <form className="task-detail-view flex flex-col m-4 p-4 gap-4">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
            <div className="w-full">
                <input className="input w-full text-2xl" name={'summary'} defaultValue={task.summary}/>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <select name="status" id="status" defaultValue={task.status} className={"select select-green w-full " + StatusColor[task.status as keyof typeof StatusColor]}>
                    {Object.keys(Status).map((status) => {
                        return (
                            <option key={status} className="option-green" value={status}>{status}</option>
                        )
                    })}
                </select>
                <select name="priority" id="priority" defaultValue={task.priority} className={"select select-green w-full " + PriorityColor[task.priority as keyof typeof PriorityColor || task.priority as keyof typeof PriorityColor]}>
                    {Object.keys(Priority).map((priority) => {
                        return (
                            <option key={priority} className="option-green" value={priority}>{priority}</option>
                        )
                    })}
                </select>
            </div>
        </div>

        <div className="main-content h-full">
            <h2 className="text-xl font-bold mb-2">Description:</h2>
            <textarea className="input w-full h-full min-h-16 min-w-16 max-h-60 rounded-md overflow-visible" defaultValue={task.description}/>
        </div>
        <div className="metadata">
            <div className="mb-2">
                <h2 className="text-xl font-bold inline-block mr-4">
                    Assignee:</h2>
                {task.assignee ?
                    <Link href={"/user/" + task.assignee} className="user-link ">
                        <Assignee userId={task.assignee}></Assignee>
                    </Link>
                    : "None"
                }
            </div>
            <div>
                <h2 className="text-xl font-bold inline-block mr-4">Create Date:</h2>
                <input type="datetime-local" className="input max-w-30ch rounded" defaultValue={task.createdAt.slice(0, 23)}></input>
            </div>
        </div>
        <div className="actions flex flex-row gap-5">
            <button className="button button-yellow" type="submit">Change</button>
            <button className="button button-red">Delete</button>
        </div>
    </form>
}
export default TaskDetailComponent
