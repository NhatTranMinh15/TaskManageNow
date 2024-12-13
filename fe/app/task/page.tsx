import Link from 'next/link';
import { fetchTasks } from '../api/task/route'
import { PriorityColor, StatusColor, TaskModel, TaskParamModel } from '../models/Task';
import Pagination from '../components/Pagination';
import { getURLParams } from '@/utils/GeneralUtils';
import "@/public/css/color.css";
import Select from './Select';
import { getTaskUrlParams } from '@/utils/TaskUtils';
import Table from './Table';
import { Header } from '../models/General';

type Props = {
    searchParams?: Promise<TaskParamModel>;
}

const headers: Header[] = [
    { name: "ID", value: "id", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: false },
    { name: "Summary", value: "summary", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: false },
    // { name: "Description", value: "description", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: true },
    { name: "Status", value: "status", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: false },
    { name: "Priority", value: "priority", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: false },
    // { name: "Created At", value: "created_at", isCurrentlySorted: false, colStyle: {}, hiddenOnSmall: true },
    { name: "Asignee", value: "assignee", isCurrentlySorted: false, colStyle: {maxWidth:"15ch"}, hiddenOnSmall: true },
]
const maxColLength = headers.length
const baseLink = process.env.BASE_TASK_URL || "/task"
const Task = async ({ searchParams }: Props) => {
    const taskUrlParams = await getTaskUrlParams(searchParams)

    const response = await fetchTasks(taskUrlParams);

    const { content: tasks, totalElements, totalPage } = response

    return (
        <>
            <div className="flex flex-row" style={{}}>
                <div className="basis-1/4 p-2">
                    <Select></Select>
                </div>
                <div className="basis-1/2 p-2">
                    <Link href={`${baseLink}/create`} className=" inline-block button button-green">Create New Task</Link>
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
                            <Table headers={headers} tasks={tasks}></Table>
                        </table>
                        <Pagination totalPages={totalPage} currentPage={Number(taskUrlParams.page)} size={+taskUrlParams.size} ></Pagination>
                    </div>
                }
            </>
        </>
    )
}

export default Task