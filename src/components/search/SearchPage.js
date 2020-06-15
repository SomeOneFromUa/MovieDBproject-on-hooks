import React, {Component} from 'react'
import {SpinnerBLosks} from "../spinners/spinnerPage";
import {key} from "../../constants";
import {MovieListCard} from "../MoviesListCard/MovieListCard";

export class SearchPage extends Component {
    state = {
        searched: [],
        isDownloading:false,
        isDownloaded: false,
        error: '',
    };
    componentDidMount() {
        this.fetchID()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.movieName !== this.props.match.params.movieName) {
            this.fetchID()
        }else return;


    }

    fetchID = async ()=>{
        const {match: {params: {movieName}}} = this.props;
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movieName}`);

        if (response.ok) {
            let json = await response.json();
            console.log(json.results);
            this.setState({
                searched: json.results,
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
        const {isDownloading,isDownloaded,error, searched} = this.state;
        return (

            <div>

                {isDownloading && !isDownloaded && <SpinnerBLosks/> }
                {!isDownloading && !isDownloaded && <div>{error}</div> }
                {!isDownloading && isDownloaded && !error && searched.map(value => {  return <MovieListCard movie={value} key={value.id}/>}) }

            </div>

        );
    }
}

