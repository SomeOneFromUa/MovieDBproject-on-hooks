import React, {Component} from 'react';
import {connect} from 'react-redux'


import {StartRating} from "../../MovieINFOcomponents/StarsRating/StartRating";
import {GenreBadge} from "../../MovieINFOcomponents/GenreBadge/genreBadge";
import {PosterPreview} from "../../MovieINFOcomponents/PosterPreview/posterPreview";
import {MovieInfo} from '../../MovieINFOcomponents/MovieInfo/MovieInfo'
import {DefaultPoster} from "../defaultImages/defaultPoster";
import {withRouter} from "react-router";

import './CustomCardStyle.css'
import {Link} from "react-router-dom";
export class MovieListCardComponent extends Component {
    state = {
        genres: [],
    };

    componentDidMount() {
        this.getGenresForCard()
    }
   getGenresForCard = ()=>{
       const {genres} = this.props;
       const {movie: {genre_ids}} =  this.props;
       let arr = [];
       genre_ids.forEach(id => arr.push(genres.find(value=>value.id === id)));
        this.setState({
            genres: arr
        })
   };
    componentDidUpdate(prevProps, prevState, snapshot) {
    }
goSpecify = (id)=>{
        const {history} = this.props;
        return ()=>{
            history.push(`/movie/${id}`)
        }
};

    render(){
        const {genres} =  this.state;
        const {movie} = this.props;
        if (!movie) return null;
        const {vote_average, poster_path} = movie;
        return (
            <div className="card cardCustom" onClick={this.goSpecify(movie.id)}>
                    <div className="card-body p-0">
                        <div className='justify-content-center d-flex'>
                            {!!poster_path
                                ? <PosterPreview posterPath={poster_path}/>
                                : <DefaultPoster/>
                            }
                        </div>
                        <GenreBadge genres={genres}/>
                        <MovieInfo movie={movie}/>

                    </div>
                <div className="card-footer">
                    <StartRating rating={vote_average}/>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (store)=>{
    const {mainReducer: {genres}} = store;
    return {
        genres
    }
};

export const MovieListCard = connect(mapStateToProps)(withRouter(MovieListCardComponent));