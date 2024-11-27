'use client'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

type Props = { totalPages: number, currentPage: number }

const Pagination = ({ totalPages, currentPage }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const getLink = (key: string, label: string | number, page: number, disable: boolean) => {
        if (disable) {
            return <div key={key} className={'page-numbers hover:cursor-pointer border-black border'}> {label}</div >
        }
        else {
            return <Link key={key} className="page-numbers" href={createPageURL(page)}>{label}</Link>
        }
    }

    const renderPageItems = () => {
        const items = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(getLink("page-" + i, i, i, i === currentPage));
            }
        }
        else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    items.push(getLink("page-" + i, i, i, i === currentPage));

                }
                items.push(
                    <div key={"left-ellipsis"} className="page-numbers">...</div>
                )
            }
            else if (totalPages - currentPage <= 2) {
                items.push(
                    <div key={"right-ellipsis"} className="page-numbers">...</div>
                )
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    items.push(getLink("page-" + i, i, i, i === currentPage));

                }
            }
            else {
                items.push(<div key={"left-ellipsis"} className="page-numbers">...</div>)
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    items.push(getLink("page-" + i, i, i, i === currentPage));
                }
                items.push(
                    <div key={"right-ellipsis"} className="page-numbers">...</div>
                )
            }
        }
        return items;
    };


    return (
        <nav className="pagination">
            {getLink("page-first", "First", 1, isFirstPage)}
            {getLink("page-previous", "Previous", currentPage - 1, isFirstPage || totalPages === 0)}

            {renderPageItems()}

            {getLink("page-next", "Next", currentPage + 1, isLastPage || totalPages === 0)}
            {getLink("page-last", "Last", totalPages, isLastPage || totalPages === 0)}
        </nav>
    )
}

export default Pagination