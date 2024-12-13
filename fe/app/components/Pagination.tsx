'use client'
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import "@/public/css/pagination.css"
import { checkIsFirstPage, checkIsLastPage, renderPageItems } from '@/utils/PaginationUtils';

type Props = {
    totalPages: number,
    currentPage: number,
    size: number
}

const pages = [1, 5, 10, 15, 25, 50];
const firstPage = parseInt(process.env.FIRST_PAGE || "0");

const Pagination = ({ totalPages, currentPage, size }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const isFirstPage = checkIsFirstPage(currentPage);
    const isLastPage = checkIsLastPage(currentPage, totalPages);

    const fixPageSize = true

    const createPageURL = (pageNumber: number | string) => {
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handleSizeChange = (size: string) => {
        params.set("size", size);
        params.set("page", "0");
        router.push(`${pathname}?${params.toString()}`);
    };

    const getPage = (key: string, label: string | number, page: number, style: string, disable: boolean) => {
        if (disable) {
            return <button key={key} className={`${style}`} disabled={disable}> {label}</button >
        }
        else {
            return <Link key={key} href={createPageURL(page)} className={` ${style}`}>{label}</Link>
        }
    }
    return (
        <div className="flex align-middle items-center justify-center gy-4 py-4">
            <div className="w-fit me-5 max-w-full min-w-12 h-full text-left">
                {fixPageSize ?
                    <select value={size} className="select select-green" onChange={(e) => { handleSizeChange(e.target.value) }}>
                        {
                            pages.map(p => (
                                <option key={p} value={p} >{p} / page</option>
                            ))
                        }
                    </select>
                    : ""
                }
            </div>
            <div>
                {getPage("page-first", "First", firstPage, "pagination-control-button rounded-s-lg", isFirstPage)}
                {getPage("page-previous", "Previous", currentPage - 1, "pagination-control-button", isFirstPage || totalPages === 0)}

                {renderPageItems(totalPages, currentPage, getPage)}

                {getPage("page-next", "Next", currentPage + 1, "pagination-control-button", isLastPage || totalPages === 0)}
                {getPage("page-last", "Last", firstPage ? totalPages : totalPages - 1, "pagination-control-button  rounded-e-lg", isLastPage || totalPages === 0)}
            </div>
        </div>
    )
}

export default Pagination