import React from 'react';
import {withRouter} from 'react-router'
import {Link} from "react-router-dom";


function Pagination (props) {
   const onClick = (page)=>{
        const {pages} = props;
        if (+page === 1 || +page === pages ) return;
        return window.scrollTo(0,0)
    };
        const {match: {params: {page}},location: {search}, url, pages} = props;
        return (
            <nav aria-label="Page navigation example m-0">
                <ul className="pagination pagination-lg justify-content-center">
                    <li className="page-item">
                        <Link onClick={onClick(page)} className="page-link" to={`${url}${page>1 ? +page-1 : page}${!!search? search: ''}`}>previous</Link>
                    </li>
                    {+page-1 !== 0 &&
                    <li className="page-item">
                        <Link onClick={onClick(page)} className="page-link" to={`${url}${page>1 ? +page-1 : page}${!!search? search: ''}`}>{+page-1}</Link>
                    </li>
                    }
                    <li className="page-item active">
                        <span className="page-link">{page}</span>
                    </li>
                    {!(+page === +pages) &&
                    <li className="page-item">
                        <Link onClick={onClick(page)} className="page-link" to={`${url}${+page ===  +pages? page: +page+1}${!!search? search: ''}`}>{+page+1}</Link>
                    </li>
                    }
                    <li className="page-item">
                        <Link onClick={onClick(page)} className="page-link" to={`${url}${+page ===  +pages? page: +page+1}${!!search? search: ''}`}>next</Link>

                            <span className="sr-only">Next</span>
                    </li>
                </ul>
            </nav>
        );
}
export  const  PaginationComponent = withRouter(Pagination);
