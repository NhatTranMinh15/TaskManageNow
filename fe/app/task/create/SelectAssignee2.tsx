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

const UserSelect2 = (props: Props) => {
    const [search, setSearch] = useState("");
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
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

    // const options: Option[] = users.map(u => {
    //     return {
    //         id: u.id,
    //         name: u.username,
    //         value: u.id
    //     }
    // });

    function changeAssignee(value: string) {
        if (value != debouncedSearch) {
            setSearch(value)
        }
    }

    return (
        <div>
            <label className="" htmlFor="priority">Assignee:</label>
            <input type="hidden" name='assignee' className='' defaultValue={selectedOptions.length > 0 ? selectedOptions[0].id : ""} />
            <Select multiple={false} options={options} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} search={search} setSearch={changeAssignee}></Select>
        </div>
    )
}


export default UserSelect2