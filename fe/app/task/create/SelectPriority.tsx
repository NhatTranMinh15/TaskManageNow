'use client'
import { useState } from "react";
import { Priority, PriorityColor } from "@/app/models/Task";
type Props = {}

const SelectPriority = (props: Props) => {
    const [priority, setPriority] = useState(Priority.MEDIUM);

    return (
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
    )
}

export default SelectPriority