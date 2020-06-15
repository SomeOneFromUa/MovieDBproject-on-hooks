import React, {Component} from "react";

export class GenreBadge extends Component{

    render() {
        const {genres} = this.props;
        if (!genres) return null;
        return(
            <div className='d-flex justify-content-start m-1 flex-wrap'>
                {genres.map(genres => <span key={genres.id} className="badge badge-dark m-0">{genres.name}</span>)}
            </div>
        )
    }



}