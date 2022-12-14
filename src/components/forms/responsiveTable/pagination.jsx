import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const Pagination = ({
    totalPages,
    pageNumber,
    pageSize,
    navigate,
}) => {
    const [pages, setPages] = useState([]);
    const [lastPage, setLastPage] = useState(0);
    const firstPage = 0;
    const minPages = 1;
    const maxPages = 5;

    useEffect(() => {
        let page = getPageNumber()+1;


        if(lastPage < pageNumber && page > maxPages && page <= getTotalPages()) {
            let pagesList = [];
            for (let i = maxPages-1; i >= 0; i--) {
                if (pagesList.length == getTotalPages()) {
                    break;
                }
                pagesList.push(page - i);
            }

            if(!pages.includes(page)) {
                setPages(pagesList);
            }
        } else if (page <= maxPages || lastPage > pageNumber) {
            let pagesList = [];
            for (let i = 0; i < maxPages; i++) {
                if (pagesList.length == getTotalPages()) {
                    break;
                }
                pagesList.push(page+i);
            }

            if(!pages.includes(page)) {
                setPages(pagesList);
            }
        }

        setLastPage(pageNumber);
    }, [pageNumber])

    const getTotalPages = () => {
        return totalPages !== undefined && totalPages !== null ? totalPages : 0;
    }

    const getPageNumber = () => {
        return pageNumber !== undefined && pageNumber !== null ? pageNumber : 0;
    }

    const prevClass = () => {
        return !totalPages || getPageNumber() == 0 ? 'page-item disabled' : 'page-item';
    };

    const nextClass = () => {
        return !totalPages || getPageNumber()+1 == totalPages ? 'disabled' : '';
    };

    const pageItemClass = (page) => {
        return pageNumber == page ? 'page-item active' : 'page-item';
    };

    return (
        <div>
            <nav aria-label="...">
                <ul className="pagination">
                    <li
                        onClick={
                            getPageNumber() <= 0 ? () => {} : () => navigate(getPageNumber()-1)
                        }
                        style={{cursor: "pointer"}}
                        className={prevClass()}
                    >
                        <span className="page-link"><ArrowLeftIcon /></span>
                    </li>
                    {
                        !pages.includes(1) && (
                            <li className="page-item disabled d-none d-sm-block">
                                <span className="page-link" href="#">...</span>
                            </li>
                        )
                    }
                    {
                        totalPages && totalPages > 0 &&
                            pages.map((page, idx) => {
                            return (
                                <li
                                    key={idx}
                                    style={{cursor: "pointer"}}
                                    className={pageItemClass(page-1)}
                                    onClick={
                                        pageNumber == page-1 ? () => {} : () => navigate(page-1)
                                    }
                                >
                                    <span className="page-link" href="#">
                                        { page }
                                    </span>
                                </li>
                            )
                        })
                    }
                    {
                        !totalPages || (getPageNumber()+1 < getTotalPages() && !pages.includes(totalPages)) &&
                            <li className="page-item disabled d-none d-sm-block">
                                <span className="page-link" href="#">...</span>
                            </li>
                    }
                    <li
                        onClick={
                            getTotalPages() <= getPageNumber()+1 ? () => {} : () => navigate(getPageNumber()+1)
                        }
                        style={{cursor: "pointer"}}
                        className={nextClass()}
                    >
                        <span className="page-link" href="#"><ArrowRightIcon /></span>
                    </li>
                </ul>
            </nav>
            {
                pageNumber !== undefined && totalPages !== undefined  && (
                    <div className="text-center mt-2">
                        Pagina {getPageNumber()+1} de {getTotalPages()}
                    </div>
                )
            }
        </div>
    );
}

export default Pagination;