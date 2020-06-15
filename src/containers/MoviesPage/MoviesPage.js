import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Provider} from 'react-redux'
import {MovieDBstore} from '../../store/MovieDB'

import 'react-bootstrap'

import {Header} from "../../components/Header/Header";
import {MovieListCard} from "../../components/MoviesListCard/MovieListCard";
import {MovieList} from "../../components/MoviesList/movieList"
import {MovieInfoPage} from "../../components/MovieInfoPage/MovieInfoPage";
import {SearchPage} from "../../components/search/SearchPage";


import 'bootstrap/dist/css/bootstrap.min.css';

class MoviesPage extends Component {
    render() {
        return (

            <Provider store={MovieDBstore}>
            <Router>
                <Header/>
                <Switch>
                    <Route path='/' exact component={MovieList}/>

                    <Route path='/movie/:movieID'
                             render={(routerProps)=>{
                                 return   (<MovieInfoPage  {...routerProps}/>)
                             }}
                />
                    <Route path='/search/:movieName'
                           render={(routerProps)=>{
                               return   (<SearchPage  {...routerProps}/>)
                           }}
                    />


                </Switch>

            </Router>
            </Provider>

        );
    }
}

export default MoviesPage;