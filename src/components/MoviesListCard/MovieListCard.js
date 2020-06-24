import React, {Component, useContext, useRef} from 'react';
import {connect} from 'react-redux'


import {StartRating} from "../../MovieINFOcomponents/StarsRating/StartRating";
import {GenreBadge} from "../../MovieINFOcomponents/GenreBadge/genreBadge";
import {PosterPreview} from "../../MovieINFOcomponents/PosterPreview/posterPreview";
import {MovieInfo} from '../../MovieINFOcomponents/MovieInfo/MovieInfo'
import {DefaultPoster} from "../defaultImages/defaultPoster";
import {withRouter} from "react-router";
import {addToFavorites} from "../../store/actions";

import './CustomCardStyle.css'
import {DarkThemeContext} from "../../context/contexts";

function MovieListCardComponent (props) {
const goSpecify = (event)=>{
    if (!(addRef.current.contains(event.target))) {
        const {history, movie: {id}} = props;
        history.push(`/movie/${id}`)
    } else return
};
const onAdd = ()=>{
        const {addToFavorites, movie} = props;
        console.log(movie);
        addToFavorites(movie)
    };
const addRef = useRef(null);
    const darkTheme = useContext(DarkThemeContext);
        const {movie, favorites, location:{pathname}, arr} = props;

        if (!movie) return null;
        const {vote_average, poster_path} = movie;
        return (
            <div className={`card cardCustom ${darkTheme.isDarkTheme? "bg-secondary": ""}`}
                 onClick={goSpecify}>
                    <div className="card-body p-0">
                        <div className='justify-content-center d-flex '>
                            {!!poster_path
                                ? <PosterPreview posterPath={poster_path}/>
                                : <DefaultPoster/>
                            }
                        </div>
                        {pathname !== "/favorites" &&
                            <GenreBadge genres={arr}/>
                        }
                        <MovieInfo movie={movie}/>
                    </div>
                <div className="card-footer d-flex justify-content-between">
                    {pathname !== "/favorites" && [
                        <StartRating rating={vote_average}/>,
                        <button className={favorites.find(value => value.id === movie.id)? 'btn btn-success' :'btn btn-info'}
                        ref={addRef}
                        onClick={onAdd}>
                            {favorites.find(value => value.id === movie.id)? 'added' :'add'}
                        </button>
                    ]}
                    {pathname === "/favorites" &&
                    <button className='btn btn-danger'
                            ref={addRef}
                            onClick={onAdd}>
                       remove
                    </button>
                    }
                </div>
            </div>
        );

}
const mapDispathToProps = ({
    addToFavorites
});
const mapStateToProps = (store, ownProps)=>{
    const {mainReducer: {genres, favorites}} = store;
    const {movie: {genre_ids}} = ownProps;
    let arr = [];
    if (genre_ids){
        genre_ids.forEach(id => arr.push(genres.find(value=>value.id === id)));
    }
    return {
        genres,
        favorites,
        arr
    }
};

export const MovieListCard = connect(mapStateToProps, mapDispathToProps)(withRouter(MovieListCardComponent));