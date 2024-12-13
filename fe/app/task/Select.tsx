'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {}

const Select = (props: Props) => {

    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    function handleChange(value: string) {
        params.set("all", value);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <select name="select-all-tasks" defaultValue={"false"} className="w-full select select-green" onChange={(e) => { handleChange(e.target.value) }}>
            <option value={"false"} className="option-green">My Task</option>
            <option value="true" className="">All Tasks</option>
        </select>
        )
}

export default Select