import React, {useContext, useEffect} from 'react';
import {connect} from 'react-redux'
import {getGenres,getMovies, stopDowloading} from '../../store/actions/index'
import {MovieListCard} from "../MoviesListCard/MovieListCard";
import {PaginationComponent} from '../Pagination/PaginationComponent'

import {SpinnerBLocks} from "../spinners/spinnerPage";
import {Collapse} from './collapse'
import querySring from 'query-string'
import {DarkThemeContext} from "../../context/contexts";
import {getMoviesMW} from "../../store/MovieDB";

function MovieListComponent (props) {
    let curSearch = querySring.parse(props.location.search);
    useEffect(()=>{
        const {match: {params: {page}}, stopDowloading, location: {search}, getMoviesMW, curPage} = props;
        let searched = querySring.parse(search);
        if ((curPage !== page) || (searched.genre !== props.curGenre)) {
            console.log('update');
            getMoviesMW && getMoviesMW(page, search, searched);
        }else {
            console.log('not updated');
            stopDowloading()
        }
    }, [props.match.params.page, curSearch.genre]);

        const darkTheme = useContext(DarkThemeContext);
        const {error,isDownloaded,isDownloading} = props;
        const {movies} = props;
        return (
            <div className={` h-100 flex-wrap d-flex justify-content-center ${darkTheme.isDarkTheme? "bg-dark text-white": "bg-white text-dark"}`}>
                {!isDownloaded && !!error && <div>{error}</div>}

                {!error &&
                <div className='col-2'>
                    <Collapse/>
                </div>
                }
                    {isDownloading && <SpinnerBLocks/>}
                {isDownloaded && !isDownloading && !error &&
                <div className='container- col-xl-10 col-sm-12 d-flex flex-row flex-wrap container justify-content-center'>
                {movies.map(movie => <MovieListCard movie={movie} key={movie.id}/>)}
                </div>
                }
                {isDownloaded && !isDownloading && !error &&
                <div className='container row justify-content-center '>
                <PaginationComponent url={/page/}/>
                </div>
                }
            </div>
        );
}
const mapDispatchToProps = ({
    getGenres,
    getMovies,
    getMoviesMW,
    stopDowloading
});
const mapStateToProps = (store)=>{
    const {mainReducer: {movies, curPage, genres, curGenre, isDownloading, isDownloaded, error}} = store;
    return{
        movies,
        curPage,
        genres,
        curGenre,
        isDownloading,
        isDownloaded,
        error,
    }
};

export const MovieList = connect(mapStateToProps, mapDispatchToProps)(MovieListComponent);