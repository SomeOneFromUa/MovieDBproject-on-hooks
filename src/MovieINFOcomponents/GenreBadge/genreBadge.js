import React from "react";

export function GenreBadge (props) {
        const {genres} = props;
        if (!genres || genres.every(value => value === undefined)) return null;
        return(
            <div className='d-flex justify-content-start m-1 flex-wrap'>
                {genres.map(genres => <span key={genres.id} className="badge badge-dark m-0">{genres.name}</span>)}
            </div>
        )
}