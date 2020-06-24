import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getGenres,getMovies, stopDowloading} from '../../store/actions/index'
import {MovieListCard} from "../MoviesListCard/MovieListCard";
import {PaginationComponent} from '../Pagination/PaginationComponent'

import {SpinnerBLocks} from "../spinners/spinnerPage";
import {Collapse} from './collapse'
import querySring from 'query-string'
import {DarkThemeContext} from "../../context/contexts";
import {getMoviesMW} from "../../store/MovieDB";


class MovieListComponent extends Component {
    componentDidMount() {
        console.log('render');
        debugger
        const {match: {params: {page}}, stopDowloading, location: {search}, getMoviesMW} = this.props;
        if (this.props.curPage !== page) {
            let searched = querySring.parse(search);
            getMoviesMW && getMoviesMW(page, search, searched);
        }else {
           stopDowloading()
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let prevSearch = querySring.parse(prevProps.location.search);
        let curSearch = querySring.parse(this.props.location.search);
        if ((prevProps.match.params.page !== this.props.match.params.page)||(prevSearch.genre !== curSearch.genre)){
            const {match: {params: {page}}, location: {search}, getMoviesMW} = this.props;
            getMoviesMW && getMoviesMW(page, search, curSearch);
        }else return
    }
    static contextType = DarkThemeContext;
 
    render() {
        const darkTheme = this.context;
        const {error,isDownloaded,isDownloading} =this.props;
        const {movies} = this.props;
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