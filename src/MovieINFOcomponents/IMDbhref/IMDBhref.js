import React from 'react';

export function ImdBhref (props) {
       const {href} = props;
        return (
            <div>
                <span className="badge badge-warning">
                    <h4>
                       <a className='text-white' target="_blank"  href={`https://www.imdb.com/title/${href}`}>IMDB</a>
                    </h4>
                </span>
            </div>
        );
}

