'use client'
import { getView } from '@/app/api/blog/view/route'
import React from 'react'
import useSWR from 'swr'

type Props = {
    id: string
}
// export const revalidate = 5 // seconds
// const ViewCount = async ({ id }: Props) => {
//     const view = await getView(id);
//     return (
//         <div className='box-content fixed right-0 bottom-0 z-50 w-fit max-w-[15ch] h-6 m-6 p-2 font-bold border border-black dark:border-white rounded-3xl overflow-hidden'>
//             {view ? view : "waiting "} views
//         </div>
//     )
// }

const url = "http://localhost:3000/api"
const ViewCount = ({ id }: Props) => {
    const { data } = useSWR(`${url}/blog/view?id=${id}`, async (url) => { const result = await fetch(url); return await result.json() }, {
        refreshInterval: 60000,
        revalidateOnFocus:false
    });
    const view = data?.view || "..."
    return (
        <div className='box-content fixed right-0 bottom-0 z-50 w-fit max-w-[15ch] h-6 m-6 p-2 font-bold border border-black dark:border-white rounded-3xl overflow-hidden'>
            {view} views
        </div>
    )
}
export default ViewCount;