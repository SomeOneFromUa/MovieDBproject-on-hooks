import React, {useContext, useEffect} from 'react';
import {key} from "../../constants";
import {SpinnerBLocks} from "../spinners/spinnerPage";
import {MovieInfoPageCard} from '../MovieInfoPageCard/MovieInfoPageCard'
import {DarkThemeContext} from "../../context/contexts";

export function MovieInfoPage (props) {
    const [movie, setMovie] = React.useState({});
    const [isDownloading, setDownloadingFlag] = React.useState(false);
    const [isDownloaded, setDownloadedFlag] = React.useState(false);
    const [error, setError] = React.useState('');

    useEffect(() => {
        fetchMovie()
    }, [props.match.params.movieID]);

    const fetchMovie = async () => {
        setDownloadingFlag(true);
        const {match: {params: {movieID}}} = props;
        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}`);
        if (response.ok) {
            let json = await response.json();
            setMovie(json);
            setDownloadingFlag(false);
            setDownloadedFlag(true);
            setError('');
        } else {
            setDownloadingFlag(false);
            setDownloadedFlag(false);
            setError('The resource you requested could not be found');
        }
    };
        const darkTheme = useContext(DarkThemeContext);
        return (
            <div className={`container-fluid ${darkTheme.isDarkTheme ? "bg-dark text-white" : "bg-white text-dark"} `}>
                {isDownloading && !isDownloaded && <SpinnerBLocks/>}
                {!isDownloading && !isDownloaded && <div>{error}</div>}
                {!isDownloading && isDownloaded && !error && <MovieInfoPageCard movie={movie}/>}
            </div>
        );
    }

