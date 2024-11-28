import React from 'react'
import { fetchTasks } from '../api/task/route'
import { PriorityColor, StatusColor, TaskModel } from '../models/Task';
import Pagination from '../components/Pagination';
import { getURLParams, URLParams } from '../models/General';

type Props = URLParams & {
}

const headers = [
    { name: "ID", value: "id", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: false },
    { name: "Summary", value: "summary", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: false },
    // { name: "Description", value: "description", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: true },
    { name: "Status", value: "status", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: false },
    { name: "Priority", value: "priority", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: false },
    // { name: "Created At", value: "created_at", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: true },
    { name: "Asignee", value: "user", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: true },
]
const maxColLength = headers.length

const Task = async (props: Props) => {
    const { currentPage, search } = await getURLParams(props)

    const response = await fetchTasks({ page: currentPage, size: 5, sort: "", search: search });
    console.log(response);

    const { content: tasks, totalElements, totalPage } = response

    function handleRowClick(data: TaskModel) {
    }
    return (
        <>
            <div className="flex flex-row">
                <div className="basis-1/4 p-2">
                    <select name="select-all-tasks" defaultValue={"false"} className="w-full select select-green">
                        <option value={"false"} className="option-green">My Task</option>
                        <option value="true" className="">All Tasks</option>
                    </select>
                </div>
                <div className="basis-1/4 p-2">
                    <button className="button button-green">Create New Task</button>
                </div>
            </div>
            <>
                {
                    tasks &&
                    <div className="flex flex-col w-full mt-4">
                        <table className="border-collapse table-auto">
                            <thead className="table-header-group">
                                <tr className="table-header-row">
                                    {headers?.map((h) => (
                                        <th key={h.name} className={"header-border " + (h.hiddenOnSmall ? "hidden md:table-cell" : "")} style={{ overflow: "hidden" }}>
                                            {h.name.length > 0 ?
                                                <div className={'table-header ' + (h.isCurrentlySorted ? "sorting-header" : "")}>
                                                    {h.name}
                                                </div>
                                                : '\u200B'
                                            }
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="table-row-group divide-y max-w-full">
                                {tasks?.map((task: TaskModel) => (
                                    <tr key={task.id} className="table-row hoverable-row">
                                        {
                                            headers.map((header) => {
                                                return (
                                                    <td key={header.value + " " + task.id} className={"truncate " + (header.hiddenOnSmall ? "hidden md:table-cell " : " ")} style={{ maxWidth: `${100 / maxColLength - 1}vw` }}>
                                                        {(() => {
                                                            switch (header.value) {
                                                                case "status":
                                                                    return <span className={"badge " + StatusColor[task[header.value] as keyof typeof StatusColor]}>{task[header.value]}</span>
                                                                case "priority":
                                                                    return <span className={"badge " + PriorityColor[task[header.value] as keyof typeof PriorityColor]}>{task[header.value]}</span>
                                                                case "user":
                                                                    return task.user ? `${task.user.first_name} ${task.user.last_name}` : "None";
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
                        </table>
                        <Pagination totalPages={totalPage} currentPage={currentPage} ></Pagination>
                    </div>
                }
            </>
        </>
    )
}

export default Task