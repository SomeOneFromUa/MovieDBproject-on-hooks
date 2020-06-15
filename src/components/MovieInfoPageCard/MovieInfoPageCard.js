import React, {Component} from 'react';
import {BackgroundImage} from "../../MovieINFOcomponents/BackGroundImage/BackgroundImage";


export class MovieInfoPageCard extends Component {

    render() {
        const {movie} = this.props;
        const {backdrop_path} = movie;
        console.log(movie);
        console.log(backdrop_path);
        return (
            <div>
                <div className="jumbotron-fluid">
                    <BackgroundImage background_Path={backdrop_path}/>
                    <h1 className="display-3">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for
                        calling extra attention to featured content or information.</p>
                    <hr className="my-2"/>
                        <p>It uses utility classes for typography and
                            spacing to space content out within the larger container.</p>
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href="#!" role="button">Some action</a>
                        </p>
                </div>
            </div>
        );
    }
}

