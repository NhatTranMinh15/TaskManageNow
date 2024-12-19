import React from 'react'
import { useEffect, useState } from "react";
import { Priority, PriorityColor, Status, StatusColor } from "@/app/models/Task";
import SelectAssignee from './SelectAssignee';
import SelectPriority from './SelectPriority';
import SelectStatus from './SelectStatus';

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
            <SelectPriority />
            <SelectStatus />
            <SelectAssignee />
        </>
    )
}

export default SelectSection