import React, {Component} from 'react';
import {BackgroundImage} from "../../MovieINFOcomponents/BackGroundImage/BackgroundImage";
import {connect} from "react-redux";
import {StartRating} from "../../MovieINFOcomponents/StarsRating/StartRating";
import {DefaultBackground} from "../defaultImages/defaultBackground";
import {GenreBadge} from "../../MovieINFOcomponents/GenreBadge/genreBadge";
import {Budget} from "../../MovieINFOcomponents/budgetComponent/Budget";
import {ImdBhref} from "../../MovieINFOcomponents/IMDbhref/IMDBhref";


export class MovieInfoPageCardComponent extends Component {

    componentDidMount() {
    }

    render() {
        const {movie, genres} = this.props;
        const {backdrop_path,
            title,
            tagline,
            vote_average,
            vote_count,
            genres: genreArr,
            adult,
            budget,
            revenue,
            imdb_id
        } = movie;
        return (
            <div className='container'>
                {!!backdrop_path
                    ?  <BackgroundImage background_Path={backdrop_path}/>
                    :  <DefaultBackground/>
                }
                <GenreBadge genres={genreArr}/>
                <div className="jumbotron bg-info">

                    <h1 >{title}</h1>
                    <p className="lead">{tagline}</p>
                    <hr className="my-2 d-flex"/>

                    <div className='justify-content-around d-flex' >
                        <div >
                            <StartRating rating={vote_average}/>
                            <span className="badge badge-dark m-3 align-self-baseline">{vote_count}</span>
                        </div>
                        <Budget budget={budget} label={'budget:'}/>
                        <Budget budget={revenue} label={'revenue:'}/>
                        <ImdBhref href={imdb_id}/>
                    </div>

                    <hr className="my-2 d-flex"/>

                </div>


            </div>
        );
    }
}


export const MovieInfoPageCard = connect()(MovieInfoPageCardComponent)
