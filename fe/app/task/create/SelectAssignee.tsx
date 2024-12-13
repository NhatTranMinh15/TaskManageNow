'use client'
import { emptyPage, Page } from '@/app/models/General'
import { UserModel } from '@/app/models/User'
import useDebounce from '@/utils/useDebounce'
import axios from 'axios'
import React, { useState } from 'react'
import useSWR from 'swr'

type Props = {}
const apiUrl = "http://localhost:3000/api/user"
const UserSelect = (props: Props) => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const { data } = useSWR(() => debouncedSearch ? `${apiUrl}?param=${debouncedSearch}` : null,
        assigneeFetcher, {
        revalidateOnFocus: false
    }
    );
    const page: Page<UserModel> = data?.data || emptyPage
    const users = page.content;
    const a = users.find((u) => u.username === debouncedSearch);
    function changeAssignee(value: string) {
        if (value != debouncedSearch) {
            setSearch(value)
        }
    }
    function removeAssignee() {
        if (a === undefined) {
            setSearch('')
        }
    }
    return (
        <div>
            <label className="" htmlFor="priority">Assignee:</label>
            <input type="hidden" name='assignee' className='' defaultValue={a?.id} />
            <input type="text" list="programmingLanguages" value={search} onBlur={() => { removeAssignee() }} onChange={(e) => { changeAssignee(e.target.value) }} className='input w-full !rounded-tl-none' autoComplete="off" />
            <datalist id="programmingLanguages">
                {
                    users.map(u => {
                        return <option key={u.id} value={u.username}>{u.firstName} {" "} {u.lastName}</option>
                    })
                }
            </datalist>

        </div>
    )
}
const assigneeFetcher = async (url: string) => {
    const data = await axios.get(url, {
        withCredentials: true
    })
    return data;
}
export default UserSelect