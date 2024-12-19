'use client'
import Select, { Option } from '@/app/components/Select'
import { emptyPage, Page } from '@/app/models/General'
import { UserModel } from '@/app/models/User'
import useDebounce from '@/utils/useDebounce'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

type Props = {}

const apiUrl = "http://localhost:3000/api/user"

const assigneeFetcher = async (url: string) => {
    const data = await axios.get(url, {
        withCredentials: true
    })
    return data;
}

const SelectAssignee = (props: Props) => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const { data } = useSWR(() => debouncedSearch ? `${apiUrl}?param=${debouncedSearch}` : null,
        assigneeFetcher, {
        revalidateOnFocus: false
    }
    );

    const options: Option[] = useMemo(() => {
        const page: Page<UserModel> = data?.data || emptyPage
        const users = page.content;
        return users.map(u => {
            return {
                id: u.id,
                name: u.username,
                value: u.id
            }
        });
    }, [data])

    return (
        <div className='mb-5'>
            <label className="" htmlFor="priority">Assignee:</label>
            <Select inputName={'assignee'} options={options} search={search} setSearch={setSearch} />
        </div>
    )
}


export default SelectAssignee