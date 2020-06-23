import React from 'react';
import {key} from "../../constants";

export function PosterPreview (props) {
        const {posterPath} = props;
        return (
                <img src={`https://image.tmdb.org/t/p/w300${posterPath}?api_key=${key}`} alt="poster"/>
        );
}
