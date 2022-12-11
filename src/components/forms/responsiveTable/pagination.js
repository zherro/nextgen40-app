import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { clsx } from 'classnames';

const Pagination = ({
    totalPages,
    pageNumer,
    lastPage,
}) => {
    const [pages, setPages] = useState([]);
    const minPages = 1;
    const maxPages = 5;

    useEffect(() => {
        let p = [];        
        let pageShow = 0;

        if((lastPage == undefined || lastPage == null) && pageNumer > 5) {
            pageShow = totalPages >= pageNumer + 2
            ? pageNumer - 2
            : totalPages >= pageNumer + 1
                ? pageNumer - 3
                : pageNumer - 4;
        } else if(lastPage !== undefined && lastPage !== null) {
            pageShow = lastPage > 5 && pageNumer > lastPage
                ? pageNumer - 4
                : lastPage > 5 && pageNumer < lastPage && totalPages >= pageNumer + 4
                    ? pageNumer + 4
                    : pageNumer + (totalPages - pageNumer);
        }

        for (let i = 0; i < 5; i++) {
            if(i == totalPages) {
                break;
            }
            p.push(i+1);
        }
        setPages(p);
    }, [totalPages])

    const prevClass = () => {
        return clsx({
            [styles[`page-item`]]: true,
            [styles[`disabled`]]: pageNumer !== undefined && pageNumer !== null && pageNumer == 1,
        })
    };

    const nextClass = () => {
        return clsx({
            [styles[`page-item`]]: true,
            [styles[`disabled`]]: pageNumer !== undefined && pageNumer !== null && pageNumer == totalPages,
        })
    };

    const pageItemClass = (page) => {
        return clsx({
            [styles[`page-item`]]: true,
            [styles[`active`]]: pageNumer == page,
        })
    };

    return (
        <nav aria-label="...">
            <ul class="pagination">
                <li class={prevClass()}>
                    <span class="page-link"><ArrowLeftIcon /></span>
                </li>
                {
                   pages.map((page, idx) => {
                    return <li class={pageItemClass(page)}><span class="page-link" href="#">1</span></li>
                   }) 
                }
                
                <li class="page-item " aria-current="page">
                    <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class={nextClass()}>
                    <span class="page-link" href="#"><ArrowRightIcon /></span>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;