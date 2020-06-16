import React, {Component} from 'react';
import {BackgroundImage} from "../../MovieINFOcomponents/BackGroundImage/BackgroundImage";
import {connect} from "react-redux";
import {StartRating} from "../../MovieINFOcomponents/StarsRating/StartRating";
import {DefaultBackground} from "../defaultImages/defaultBackground";


export class MovieInfoPageCardComponent extends Component {

    componentDidMount() {
    }

    render() {
        const {movie, genres} = this.props;
        const {backdrop_path, title,tagline, vote_average, vote_count} = movie;
        return (
            <div className='container'>

                {!!backdrop_path
                    ?  <BackgroundImage background_Path={backdrop_path}/>
                    :  <DefaultBackground/>
                }

                <div className="jumbotron">

                    <h1 className="display-3">{title}</h1>
                    <p className="lead">{tagline}</p>
                    <hr className="my-2 d-flex"/>
                    <StartRating rating={vote_average}/>
                    <span className="badge badge-light m-3">{vote_count}</span>
                </div>


            </div>
        );
    }
}


export const MovieInfoPageCard = connect()(MovieInfoPageCardComponent)
