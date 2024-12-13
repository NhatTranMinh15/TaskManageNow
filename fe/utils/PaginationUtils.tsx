const firstPage = parseInt(process.env.FIRST_PAGE || "0");

export const checkIsFirstPage = (currentPage: number) => {
    return currentPage <= firstPage;
}

export const checkIsLastPage = (currentPage: number, totalPages: number) => {
    if (firstPage) {
        return currentPage >= totalPages;
    }
    else {
        return currentPage >= totalPages - 1;
    }
}


export const renderPageItems = (totalPages: number, currentPage: number, getPage: any) => {
    if (firstPage) {
        return renderPageItemsFromOne(totalPages, currentPage, getPage);
    } else {
        return renderPageItemsFromZero(totalPages, currentPage, getPage);
    }
};

const renderPageItemsFromZero = (totalPages: number, currentPage: number, getPage: any) => {
    const items = [];
    if (totalPages <= 5) {
        for (let i = 0; i < totalPages; i++) {
            items.push(getPage("page-" + i, i + 1, i, "pagination-button", i === currentPage));
        }
    }
    else {
        if (currentPage < 3) {
            for (let i = 0; i < 5; i++) {
                items.push(getPage("page-" + i, i + 1, i, "pagination-button", i === currentPage));
            }
            items.push(<div key={"right-ellipsis"} className="pagination-button">...</div>)
        }
        else if (totalPages - currentPage <= 3) {
            items.push(<div key={"left-ellipsis"} className="pagination-button">...</div>)
            for (let i = totalPages - 5; i < totalPages; i++) {
                items.push(getPage("page-" + i, i + 1, i, "pagination-button", i === currentPage));

            }
        }
        else {
            items.push(<div key={"left-ellipsis"} className="pagination-button">...</div>)
            for (let i = currentPage - 2; i < currentPage + 3; i++) {
                items.push(getPage("page-" + i, i + 1, i, "pagination-button", i === currentPage));
            }
            items.push(
                <div key={"right-ellipsis"} className="pagination-button">...</div>
            )
        }
    }
    return items;

};
const renderPageItemsFromOne = (totalPages: number, currentPage: number, getPage: any) => {
    const items = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            items.push(getPage("page-" + i, i, i, "pagination-button", i === currentPage));
        }
    }
    else {
        if (currentPage <= 3) {
            for (let i = 1; i <= 5; i++) {
                items.push(getPage("page-" + i, i, i, "pagination-button", i === currentPage));
            }
            items.push(
                <div key={"left-ellipsis"} className="pagination-button">...</div>
            )
        }
        else if (totalPages - currentPage <= 2) {
            items.push(
                <div key={"right-ellipsis"} className="pagination-button">...</div>
            )
            for (let i = totalPages - 4; i <= totalPages; i++) {
                items.push(getPage("page-" + i, i, i, "pagination-button", i === currentPage));

            }
        }
        else {
            items.push(<div key={"left-ellipsis"} className="pagination-button">...</div>)
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                items.push(getPage("page-" + i, i, i, "pagination-button", i === currentPage));
            }
            items.push(
                <div key={"right-ellipsis"} className="pagination-button">...</div>
            )
        }
    }
    return items;

};
