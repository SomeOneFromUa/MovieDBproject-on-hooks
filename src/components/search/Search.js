import React, {Component} from 'react';
import {connect} from  'react-redux'
import {key} from "../../constants";
import {Link} from 'react-router-dom'

import './searchStyle.css'


class SearchComponent extends Component {
    state = {
        keyWord: '',
        searched: [],
        searching: false
    };
    handler = (ev)=>{
        this.setState({
            keyWord: ev.target.value
        })
    };
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevState.keyWord,this.state.keyWord );
        if (prevState.keyWord === this.state.keyWord || this.state.keyWord === '') return;
        this.fetchSearch(this.state.keyWord);
        // console.log(this.state.searched);
    }
    fetchSearch = async (word)=>{
        this.setState({
            searching: true
        });
        let arr = await fetch(`https://api.themoviedb.org/3/search/keyword?query=${word}&api_key=${key}`);
        let json = await arr.json();
        if (json.status_code === 34) return ;
        json.results.length = 10;
        this.setState({
            searched: json.results,
            searching: false
        })
    };

    render() {
        const {searching,searched} = this.state;
        return (
            <nav className="navbar navbar-light " >
                <form className="form-inline position-relative" >
                    <input className="form-control mr-sm-2 searchW" type="text" size="50" onChange={this.handler} />
                    <div>
                        {!searching && <ul className="list-group fixed">

                            {!!searched && searched.map(value =>  <li key={value.id}
                                                                      className="list-group-item">

                                <Link to={`/search/${value.name}`}>{value.name}</Link>

                            </li>)}
                        </ul>}

                    </div>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        );
    }
}


export const Search = connect()(SearchComponent);
