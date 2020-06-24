import {GET_GENRES,
    GET_MOVIES,
    SEARCH,
    CLEAR_ON_HOME,
    ADD_TO_FAVORITES,
    ERROR_HANDLER,
    STOP_DWNLD_MOVIES,
    START_DWNLD_MOVIES
} from '../actions-type/index'

export const getMovies = (arr, page, genre)=>{
    return{
        type: GET_MOVIES,
        payload: arr,
        page: page,
        genre: genre
    }
};
export const getGenres = (arr)=>{
    return{
        type: GET_GENRES,
        payload: arr
    }
};
export const getSearched = (searched, totalP, totalR, page)=>{
    return {
        type: SEARCH,
        payload: searched,
        totalR: totalR,
        totalP: totalP,
        curPage: page
    }
};
export const clearOnHome = ()=>{
    return {
        type: CLEAR_ON_HOME
    }
};

export const addToFavorites = (movie)=>{
    return {
        type: ADD_TO_FAVORITES,
        payload: movie
    }
};
export const startDowloading = ()=>{
    return {
        type: START_DWNLD_MOVIES
    }
};
export const stopDowloading = ()=>{
    return {
        type: STOP_DWNLD_MOVIES
    }
};
export const errorHandler = (error)=>{
    return {
        type: ERROR_HANDLER,
        payload: error
    }
};
