'use client'
import { useState } from "react";
import { Status, StatusColor } from "@/app/models/Task";
type Props = {}

const SelectPriority = (props: Props) => {
    const [status, setStatus] = useState(Status.OPEN);

    return (
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
    )
}

export default SelectPriority