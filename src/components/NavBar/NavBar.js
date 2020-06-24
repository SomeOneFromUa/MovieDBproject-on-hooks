import React, {Component, useContext, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {clearOnHome} from "../../store/actions";
import {DarkThemeContext, isDarkTheme} from "../../context/contexts";

import './NavBarStyle.css'


function NavBarComponent (props) {
    const [isNEW, setIsNEW] = React.useState(false);

    const CleareHomePage = ()=>{
        const {func} = props;
        const {clearOnHome} = props;
        clearOnHome();
        func && func()
    };
   const Watched = ()=>{
        const {func} = props;
       setIsNEW(false);
        func && setTimeout(()=>{func();},200)
    };
//todo: revise logic
   useEffect(()=>{
       console.log('update isNew');
       setIsNEW(true);
   }, [props.favorites.length]);
   
        const darkTheme = useContext(DarkThemeContext);
        const {favorites, flag} = props;

        return (
               <div className={`nawBar ${flag && "direction"}`}>
                   <div>
                       <NavLink onClick={CleareHomePage} className={`${darkTheme.isDarkTheme ? " text-white" : " text-dark"}`} to='/page/1'> <h4>Home</h4></NavLink>
                   </div>
                   <div className='direction'>
                       <NavLink className={`${darkTheme.isDarkTheme ? " text-white" : " text-dark"}`} onClick={Watched} to='/favorites'> <h4>Favorites</h4></NavLink>
                       {isNEW && favorites.length > 0 && <div className='badge badge-warning'><h6>new</h6></div>}
                   </div>
               </div>
        );
}
const mapStateToProps =(store)=>{
    const {mainReducer: {favorites}} = store;
    return {
        favorites
    }
};
 const mapDispatchToProps = ({
    clearOnHome
});
export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);