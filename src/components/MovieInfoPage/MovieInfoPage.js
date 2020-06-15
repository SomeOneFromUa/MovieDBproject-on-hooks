import React, {Component} from 'react';
import {key} from "../../constants";
import {SpinnerBLosks} from "../spinners/spinnerPage";
import {MovieInfoPageCard} from '../MovieInfoPageCard/MovieInfoPageCard'

export class MovieInfoPage extends Component {
    state = {
        movie: {},
        isDownloading: false,
        isDownloaded: false,
        error: ''
    };
    componentDidMount() {
       this.fetchMovie()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.movieID !== this.props.match.params.movieID) {
            this.fetchMovie();
            console.log(this.state);
        } else return;


    }

    fetchMovie = async ()=>{
        this.setState({
            isDownloading: true
        });
        const {match: {params: {movieID}}} = this.props;
        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}`);
        console.log(response);
            if (response.ok) {
                let json = await response.json();
                console.log(json);
                this.setState({
                    movie: json,
                    isDownloading:false,
                    isDownloaded: true,
                    error: ''
                })
            }else {
                this.setState({
                    isDownloading: false,
                isDownloaded: false,
                error: 'The resource you requested could not be found'
            })
        }

    };
    render() {
    const {isDownloading,isDownloaded,error, movie} = this.state;
        return (
            <div className='container'>
                {isDownloading && !isDownloaded && <SpinnerBLosks/> }
                {!isDownloading && !isDownloaded && <div>{error}</div> }
                {!isDownloading && isDownloaded && !error && <MovieInfoPageCard movie={movie}/>}
            </div>
        );
    }
}

