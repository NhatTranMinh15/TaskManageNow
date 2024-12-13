import React from 'react'
import { useEffect, useState } from "react";
import { Priority, PriorityColor, Status, StatusColor } from "@/app/models/Task";
import UserSelect2 from './SelectAssignee2';

type Props = {
    state: any
}

const SelectSection = ({ state }: Props) => {
    const [priority, setPriority] = useState(Priority.MEDIUM);
    const [status, setStatus] = useState(Status.OPEN);

    useEffect(() => {
        setPriority(Priority.MEDIUM);
        setStatus(Status.OPEN);
    }, [state])

    return (
        <>
            <div className="mb-[15px]">
                <label className="" htmlFor="priority">Priority:</label>
                <select
                    className={`select select-green p-2 !rounded-tl-none ${PriorityColor[priority as keyof typeof PriorityColor]}`}
                    id="priority"
                    name="priority"
                    required
                    value={priority}
                    onChange={(e) => { setPriority(e.target.value as Priority) }}
                >
                    {
                        Object.keys(Priority).map((priority) => (
                            <option key={priority} value={priority} className={"option-green"}>{priority}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-[15px]">
                <label className="" htmlFor="status">Status:</label>
                <select
                    className={`select select-green p-2 !rounded-tl-none ${StatusColor[status as keyof typeof StatusColor]}`}
                    id="status"
                    name="status"
                    required
                    value={status}
                    onChange={(e) => { setStatus(e.target.value as Status) }}
                >
                    {
                        Object.keys(Status).map((status) => (
                            <option key={status} value={status} className={"option-green"}>{status}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-5">
                {/* <UserSelect /> */}
                <UserSelect2 />
            </div>
        </>
    )
}

export default SelectSection