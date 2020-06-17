import React, {Component} from 'react';
import {connect} from "react-redux";
import {MovieListCard} from "../MoviesListCard/MovieListCard";

class FavoritesPageComponent extends Component {
    render() {
        const {favorites} = this.props;
        return (
            <div className='col-10 d-flex flex-row flex-wrap container'>
                {favorites.map(value => <MovieListCard movie={value}/>)}
            </div>
        );
    }
}
const mapStateToProps = (store)=>{
    const {mainReducer: {favorites}} = store
    return {
        favorites
    }
};
export const FavoritesPage = connect(mapStateToProps)(FavoritesPageComponent);

