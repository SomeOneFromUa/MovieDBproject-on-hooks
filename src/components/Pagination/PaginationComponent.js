import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Link} from "react-router-dom";


class Pagination extends Component {
    
    render() {
        const {match: {params: {page}, path},location: {search} } = this.props;
        debugger

        return (

            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-lg justify-content-center">
                    <li className="page-item">
                        <Link onClick={()=>{window.scrollTo(0,0)}} className="page-link" to={`/page/${page>1 ? +page-1 : page}${!!search? search: ''}`}>previous</Link>
                    </li>
                    {+page-1 !== 0 &&
                    <li className="page-item">
                        <span className="page-link">{+page-1}</span>
                    </li>
                    }

                    <li className="page-item active">
                        <span className="page-link">{page}</span>
                    </li>
                    <li className="page-item">
                        <span className="page-link"> {+page+1}</span>
                    </li>
                    <li className="page-item">
                        <Link onClick={window.scrollTo(0,0)} className="page-link" to={`/page/${+page+1}${!!search? search: ''}`}>next</Link>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>

                    </li>
                </ul>
            </nav>

        );
    }
}
export  const  PaginationComponent = withRouter(Pagination);
