'use client'
import { Header } from '@/app/models/General'
import { PriorityColor, StatusColor, TaskModel } from '@/app/models/Task'
import { useRouter } from 'next/navigation'

type Props = {
    headers: Header[],
    tasks: TaskModel[],
}
const baseLink = process.env.BASE_TASK_URL || "/task"
const Table = ({ headers, tasks }: Props) => {
    const router = useRouter()
    const maxColLength = headers.length
    const maxWidth = 100 / maxColLength - 1
    function handleRowClick(task: TaskModel) {
        if (!window.getSelection()?.toString()) {
            router.push(`${baseLink}/${task.id}`)
        }
    }
    return (
        <tbody className="table-row-group divide-y max-w-full">
            {tasks?.map((task: TaskModel) => (
                <tr key={task.id} className="table-row hoverable-row">
                    {
                        headers.map((header) => {
                            return (
                                <td key={header.value + " " + task.id} className={"truncate " + (header.hiddenOnSmall ? "hidden md:table-cell " : " ")} style={{ maxWidth: `${maxWidth}vw`, ...header.colStyle }} onClick={(e) => { e.stopPropagation(); handleRowClick(task) }}>
                                    {(() => {
                                        switch (header.value) {
                                            case "status":
                                                return <span className={"badge " + StatusColor[task[header.value] as keyof typeof StatusColor]}>{task[header.value]}</span>
                                            case "priority":
                                                return <span className={"badge " + PriorityColor[task[header.value] as keyof typeof PriorityColor]}>{task[header.value]}</span>
                                            case "assignee":
                                                return task.assignee ? `${task.assignee}` : "None";
                                            default:
                                                // Add your default case code here
                                                return task[header.value]?.toString() || "";
                                        }
                                    })()}
                                </td>
                            )
                        })
                    }
                </tr>
            ))
            }
        </tbody>
    )
}

export default Table