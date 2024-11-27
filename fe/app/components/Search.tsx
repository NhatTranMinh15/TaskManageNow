'use client'
import React, { useRef, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
type Props = {}

const Search = (props: Props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = useRef(new URLSearchParams(searchParams)).current;
    function handleSearch(search: string) {
        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }
    }


    return (
        <>
            <input
                className="min-w-[15ch] w-[30ch] flex h-20 mb-0 mr-10 rounded-full p-5"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        replace(`${pathname}?${params.toString()}`);
                    }
                }}
                placeholder='Click to Search'
                defaultValue={searchParams.get('search')?.toString()}
            />
        </>
    )
}

export default Search