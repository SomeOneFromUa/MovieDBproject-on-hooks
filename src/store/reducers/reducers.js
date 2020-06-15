import {combineReducers} from 'redux'
import {GET_GENRES, GET_MOVIES, SEARCH} from '../actions-type/index'

const defaultStore = {
    movies: [],
    genres: [],
    searched: []
};

export function mainReducer(store = defaultStore, action) {

    switch (action.type) {
        case GET_MOVIES: {
            const {payload} = action;
            return {
                ...store,
                movies: payload
            }
        }
        case GET_GENRES: {
            const {payload} = action;
            return {
                ...store,
                genres: payload
            }
        }
        case SEARCH: {
            const {payload} = action;
            return {
                ...store,
                searched: payload
            }
        }

        default: return store
    }

}



export const rootReducer = ()=>{
    return combineReducers(
        {
            mainReducer
        }
    )
}