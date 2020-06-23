import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {connect} from 'react-redux'

import 'react-bootstrap'
import {Header} from "../../components/Header/Header";
import {MovieList} from "../../components/MoviesList/movieList"
import {MovieInfoPage} from "../../components/MovieInfoPage/MovieInfoPage";
import {SearchPage} from "../../components/search/SearchPage";
import {FavoritesPage} from "../../components/FavoritesPage/favoritesPage";
import {DarkThemeWraper} from "../../context/wrappers/DarkThemeWraper";
import {DetectViewPortWrapper} from "../../context/wrappers/DetectViewPortWrapper";
import {getGenres} from "../../store/actions";

import 'bootstrap/dist/css/bootstrap.min.css';
import {key} from "../../constants";

class MoviesPageComonent extends Component {
    componentDidMount() {
        this.fetchGenres()
    }

    fetchGenres = async ()=>{
        const {getGenres}= this.props;
        console.log('fetch genres');
        const response =  await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`);
        let json = await response.json();
        if (Array.isArray(json.genres)){
            getGenres(json.genres);
        }
    };
    render() {
        return (
            <DetectViewPortWrapper>
            <DarkThemeWraper>
            <Router>
                <Header/>
                <Switch>
                    <Route path='/page/:page'
                           component={MovieList}
                    ></Route>
                    <Route path='/movie/:movieID'
                             render={(routerProps)=>{
                                 return   (<MovieInfoPage  {...routerProps}/>)
                             }}/>
                    <Route path='/search/:page'
                           render={(routerProps)=>{
                               return   (<SearchPage  {...routerProps}/>)
                           }}/>
                    <Route path='/favorites'
                           component={FavoritesPage}
                    ></Route>
                    <Redirect from='/' to='/page/1'/>
                </Switch>
            </Router>
                </DarkThemeWraper>
                </DetectViewPortWrapper>
        );
    }
}
const mdtp = ({
    getGenres
});
export const MoviesPage = connect(null, mdtp)(MoviesPageComonent);