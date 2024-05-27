import React, { useState } from "react";

const usePagination: any = (items: Product[], pageLimit: number) => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageCount = Math.ceil(items.length / pageLimit);

    const changePage = (pN: number) => {
        setPageNumber(pN);
    };

    const pageData = () => {
        const s = pageNumber * pageLimit;
        const e = s + pageLimit;
        return items && items.length > 1 ? items.slice(s, e) : [];
    };

    const nextPage = () => {
        setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
    };

    const previousPage = () => {
        setPageNumber(Math.max(pageNumber - 1, 0));
    };

    return {
        pageNumber,
        pageCount,
        changePage,
        pageData,
        nextPage,
        previousPage,
    };
}

export default usePagination;
