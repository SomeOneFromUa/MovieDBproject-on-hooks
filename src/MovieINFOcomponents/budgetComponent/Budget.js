import React from 'react';

export function Budget (props) {
        const {budget, label} = props;
        return (
            <div className='badge badge-info'>
                {label} <h5>{budget}</h5>
            </div>
        );
}
