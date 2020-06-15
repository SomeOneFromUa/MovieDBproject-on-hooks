import React, {Component} from 'react';
import {key} from "../../constants";

export class PosterPreview extends Component {
    render() {
        const {posterPath} = this.props;
        return (
            <div>
                <img src={`https://image.tmdb.org/t/p/w185${posterPath}?api_key=${key}` || 'https://www.baltimoresportsandlife.com/wp-content/uploads/2016/07/Movies.jpg'} alt="poster"/>
            </div>
        );
    }
}
