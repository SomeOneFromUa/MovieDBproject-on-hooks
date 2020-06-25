import React, {useContext, useEffect, useState} from 'react'
import {SpinnerBLocks} from "../spinners/spinnerPage";
import {key} from "../../constants";
import {MovieListCard} from "../MoviesListCard/MovieListCard";
import {PaginationComponent} from "../Pagination/PaginationComponent";
import queryString from 'query-string'
import {connect} from "react-redux";
import {getSearched} from "../../store/actions";
import {DarkThemeContext} from "../../context/contexts";
import './searchStyle.css'


function SearchPageComponent (props) {
    const [isDownloading, setDownloading] = useState(false);
    const [isDownloaded, setDownloaded] = useState(false);
    const [error, setError] = useState('');
    let curSearch = queryString.parse(props.location.search);

    useEffect(()=>{
                fetchID()
    },[curSearch.keyword, props.match.params.page] );

    const fetchID = async ()=>{
        setDownloading(true);
        setDownloaded(false);
        const {match: {params: {page}}, location: {search}, getSearched} = props;
        const searched = queryString.parse(search);
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searched.keyword}&page=${page}`);
        if (response.ok) {
            let json = await response.json();
            const {total_pages, total_results} = json;
            getSearched(json.results, total_pages, total_results,page);
            setDownloaded(true);
            setDownloading(false);
            setError('');
        }else {
            setDownloaded(false);
            setDownloading(false);
            setError(`error code: ${response.status}`);
        }
    };
    
        const darkTheme = useContext(DarkThemeContext);
        const {searched, totalResults, totalPage, location: {search}}= props;
        let keyword = queryString.parse(search);
        return (
            <div>
                {isDownloaded &&
                <div className="list-group transition">
                    <span className={`list-group-item list-group-item-action ${!!searched.length? "list-group-item-info" : 'list-group-item-warning'}  d-flex justify-content-around `}>
                        {searched.length === 0 &&  <h5 className='m-2'>nothin was found for '{keyword.keyword}'</h5> }
                        {searched.length >= 1 && [
                        <h5 className='m-2'>Search for '{keyword.keyword}'</h5>,
                        <h5 className='m-2'>total results - {totalResults}</h5>,
                            <h5 className='m-2'>total pages = {totalPage}</h5>
                            ]
                        }
                        {!!error && <h5 className='m-2'>{error}</h5> }

                    </span>
                </div>
                }
                {darkTheme.isDarkTheme && searched.length === 0 && <div className='bg-dark' style={{"height": "90vh"}}></div>}
                <div className={`flex-wrap d-flex flex-row  h-100
                            container-fluid
                            justify-content-center
                            ${darkTheme.isDarkTheme? 'bg-dark': 'bg-white'}
                            `}>
                    {isDownloading && !isDownloaded && <SpinnerBLocks/> }
                    {!isDownloading && !isDownloaded && <div>{error}</div> }
                    {!isDownloading && isDownloaded && !error && searched.map(value => { return <MovieListCard movie={value} key={value.id}/>}) }

                </div>
                {!isDownloading && isDownloaded && !error && searched.length >= 1 &&
                <div className={`flex-row  ${darkTheme.isDarkTheme? 'bg-dark': 'bg-white'}`}>
                    <PaginationComponent url={'/search/'} pages={totalPage}/>
                </div>
                    }
            </div>
        );
}
const mapStateToProps = (store)=>{
    const {mainReducer: {searched, totalPage, totalResults, curSearchPage, curSearchWord}} = store;
    return {
        searched,
        totalResults,
        totalPage,
        curSearchPage,
        curSearchWord
    }
};
const mapDispathToProps = ({
    getSearched,
});

export const SearchPage = connect(mapStateToProps,mapDispathToProps )(SearchPageComponent);
