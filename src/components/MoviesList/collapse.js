import React, {Component, useContext} from 'react';
import {ListGroupItem} from 'reactstrap';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {DarkThemeContext} from "../../context/contexts";

import './movieListStyle.css'
import './movieListSyle.scss'


function CollapseComponent (props) {
const darkTheme = useContext(DarkThemeContext);
      const {genres, curGenre, flag, func} = props;
      if (!genres) return ;
      return (
          <div className={flag? 'p-3 d-flex flex-wrap': 'groupList'}>
              {genres.map(value =>
                  <div  key={value.id} className={`collapseItem collapseItem ${darkTheme.isDarkTheme? 'dark': 'bright'} ${+curGenre === value.id && 'choosen'}  ${flag && 'w-50'}`}>
                  <NavLink onClick={func}  to={`/page/1?genre=${value.id}`}>
                  <span>{value.name}</span>
                  </NavLink>
                  </div>
              )}
          </div>
      )
}
const masStateToProps = (store)=>{
    const {mainReducer: {curGenre, genres}} = store;
    return{
        curGenre,
        genres
    }
};
export const Collapse = connect(masStateToProps)(CollapseComponent);


