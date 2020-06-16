import {GET_GENRES, GET_MOVIES, SEARCH} from '../actions-type/index'

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
export const search = (searched)=>{
    return {
        type: SEARCH,
        payload: searched
    }
};