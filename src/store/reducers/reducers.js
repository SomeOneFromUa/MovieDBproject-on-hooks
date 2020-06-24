import {combineReducers} from 'redux'
import {CLEAR_ON_HOME,
    GET_GENRES,
    GET_MOVIES,
    ADD_TO_FAVORITES,
    ERROR_HANDLER,
    START_DWNLD_MOVIES,
    STOP_DWNLD_MOVIES,
    SEARCH
} from '../actions-type/index'

const defaultStore = {
    movies: [],
    genres: [],
    curPage: 1,
    curGenre: undefined,
    searched: [],
    totalPage: '',
    totalResults: '',
    curSearchPage: '',
    favorites: [],
    isDownloading: false,
    isDownloaded: false,
    error: ''
};

export function mainReducer(store = defaultStore, action) {

    switch (action.type) {
        case GET_MOVIES: {
            const {payload, page, genre} = action;
            return {
                ...store,
                movies: payload,
                curPage: page,
                curGenre: genre || undefined
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

            const {payload, totalR,totalP, curPage} = action;
            return {
                ...store,
                searched  : payload,
                totalPage: totalP,
                totalResults: totalR,
                curSearchPage: curPage

            }
        }
        case CLEAR_ON_HOME: {
            return {
                ...store,
                curGenre: ''
            }
        }
        case ADD_TO_FAVORITES: {
            const {payload} =action;
            const {favorites} = store;
           const index = favorites.findIndex(value => value.id === payload.id);
           if (index === -1){
               return {
                   ...store,
                   favorites: [...favorites, payload]
               }
           }else if (index >= 0) {
               const favoritesCopy = [...favorites];
               favoritesCopy.splice(index,1);
               return {
                   ...store,
                   favorites: favoritesCopy
               }
           }else return store
        }
        case START_DWNLD_MOVIES: {
            return {
                ...store,
                isDownloading: true,
                isDownloaded: false
            }
        }
        case STOP_DWNLD_MOVIES: {
            return {
                ...store,
                isDownloading: false,
                isDownloaded: true,
                error: ''
            }
        }
        case ERROR_HANDLER: {
            const {payload} = action;
            return {
                ...store,
                isDownloaded: false,
                error: payload
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
};