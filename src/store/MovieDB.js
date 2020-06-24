import {createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootReducer} from '../store/reducers/reducers'
import {key} from "../constants";
import {startDowloading,stopDowloading, errorHandler, getMovies} from "./actions";

export const MovieDBstore = createStore(rootReducer(), composeWithDevTools(applyMiddleware(thunk)));

export const getMoviesMW = (page, search, searched)=>{

    return (dispatch, getState)=>{
        let state = getState();
            dispatch(startDowloading());
            return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}&include_adult=true${!!search? `&with_genres=${searched.genre}`: ''}`)
                .then(response => response.json())
                .then(json => {
                    if (json.page){
                        dispatch( getMovies(json.results, page, searched.genre));
                        dispatch(stopDowloading());
                    }else    {
                        dispatch(errorHandler(json.errors))
                    }
                })
                .catch(error => {
                    dispatch(errorHandler(error))
                })
    }
};