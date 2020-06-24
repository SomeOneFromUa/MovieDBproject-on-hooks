import React, {useContext} from 'react';
import {LogoHeader} from "../logo/logo";
import {Search} from "../search/Search";
import {DarkThemeContext} from "../../context/contexts";
import Close from '../../assets/close.png'
import MenuIcon from '../../assets/menu-icon.png'
import {NavBar} from "../NavBar/NavBar";
import {SwitchToggler} from "../switchToggler/switchToggler";
import {UserInfo} from "../UserInfo/userInfo";
import {Collapse} from '../../components/MoviesList/collapse'

import './headerStyle.css'
import './MobileHeaderStyle.scss'


export function HeaderMobile () {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isClosed, setIsClosed] = React.useState(true);
    const [isGenreBarOpen, setGenrebarOpen] = React.useState(false);
   const toggle = ()=>{
       setIsOpen(true);
       setIsClosed(!isClosed);
       setGenrebarOpen(false);
    };
   const  toogleGenres = ()=> {
       setGenrebarOpen(!isGenreBarOpen);
   };
   const toogleSideBar = ()=>{
       setIsOpen(false);
       setIsClosed(true);
       setGenrebarOpen(false);
    };
        const darkTheme = useContext(DarkThemeContext);
       const {isDarkTheme, themeToggle} = darkTheme;
        return (
       <div className={`d-flex justify-content-between align-items-center  header headerScroled ${isDarkTheme && 'bg-dark text-white'}`}>
               <img onClick={toggle} className='iconMenu m-2' src={MenuIcon} alt="menu"/>
           <LogoHeader flag={true}/>
           {isOpen &&
           <div className={`panel${isClosed? ' none':''} ${isDarkTheme && 'bg-dark text-white'} flex-column align-items-start`}>
               <div className='head'>
                   <SwitchToggler flag={isDarkTheme} func={themeToggle} label='toggle theme'/>
                   <div className='close-btn' onClick={toggle}> <img src={Close} alt="close" /></div>
               </div>
               {!isGenreBarOpen && [
                   <UserInfo flag={true}/>,
                   <Search func={toogleSideBar}/>,
                   <NavBar func={toogleSideBar}/>
               ]}
                <div className="genresMenu">
                    <h4 onClick={toogleGenres}>{isGenreBarOpen? " < back": "Genres"}</h4>
                </div>
               {isGenreBarOpen &&
               <Collapse flag={true} func={toogleSideBar}/>
               }
           </div>
           }
       </div>
        );
}
