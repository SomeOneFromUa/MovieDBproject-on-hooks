import React from 'react';
import {key} from "../../constants";

export function BackgroundImage (props) {
        const {background_Path} = props;
        return (
            <div className=''>
                <img className='w-100' src={`https://image.tmdb.org/t/p/original${background_Path}?api_key=${key}`} alt="poster"/>
            </div>
        );
}
