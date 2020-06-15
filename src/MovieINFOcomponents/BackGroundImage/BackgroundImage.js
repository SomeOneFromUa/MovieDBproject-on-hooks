import React, {Component} from 'react';
import {key} from "../../constants";

export class BackgroundImage extends Component {
    render() {
        const {background_Path} = this.props;
        return (
            <div>
                <img src={`https://image.tmdb.org/t/p/original${background_Path}?api_key=${key}`} alt="poster"/>
            </div>
        );
    }
}
