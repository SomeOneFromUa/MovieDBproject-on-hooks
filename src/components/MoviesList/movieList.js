import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getGenres,getMovies} from '../../store/actions/index'
import {MovieListCard} from "../MoviesListCard/MovieListCard";
import {PaginationComponent} from '../Pagination/PaginationComponent'
import {key} from "../../constants";
import {SpinnerBLosks} from "../spinners/spinnerPage";

class MovieListComponent extends Component {
    state = {
        isDownloading: false,
        isDownloaded: false,
        error: '',
    };
    componentDidMount() {
        const {match: {params: {page}}} = this.props;
        if (this.props.movies.length === 0 || page !== 1) {
            this.fetchGenres();
            this.fetchMovies();
        }else {
            this.setState({
                isDownloading: false,
                isDownloaded: true,
                error: '',
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.page !== this.props.match.params.page){
            this.fetchMovies();
        }else return
    }

    fetchGenres = async ()=>{
        const {getGenres} = this.props;
        this.setState({
            isDownloading: true
        });
        const response =  await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`);
        let json = await response.json();
        if (Array.isArray(json.genres)){
            getGenres(json.genres);
        }else    {
            this.setState({
                error: json.errors
            })
        }
    };
    fetchMovies = async ()=>{
        const {match: {params: {page}}} = this.props;
        const {getMovies} = this.props;
        this.setState({
            isDownloading: true
        });
       const response =  await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}`);
       let json = await response.json();
       if (json.page){
           getMovies(json.results);
           this.setState({
               isDownloading: false,
               isDownloaded: true,
               error: ''
           })
       }else    {
           this.setState({
               isDownloaded: false,
               error: json.errors
           })
       }
    };
    render() {
        const {error,isDownloaded,isDownloading} =this.state;
        const {movies} = this.props;
        return (
            <div className='container d-flex flex-wrap'>
                {!isDownloaded && !!error && <div>{error}</div>}
                {isDownloading && <SpinnerBLosks/>}

                {isDownloaded && !isDownloading && !error && movies.map(movie => <MovieListCard movie={movie} key={movie.id}/>)}

                {isDownloaded && !isDownloading && !error && <PaginationComponent/>}
            </div>
        );
    }
}
const mapDispatchToProps = ({
    getGenres,
    getMovies
});
const mapStateToProps = (store)=>{
    const {mainReducer: {movies}} = store;
    return{
        movies
    }
};


export const MovieList = connect(mapStateToProps, mapDispatchToProps)(MovieListComponent);