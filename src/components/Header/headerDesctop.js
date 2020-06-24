import React, {Component, useEffect} from 'react';

import {LogoHeader} from "../logo/logo";
import {Search} from "../search/Search";
import {UserInfo} from "../UserInfo/userInfo";
import {NavBar} from "../NavBar/NavBar";
import {DarkThemeContext} from "../../context/contexts";
import {SwitchToggler} from "../switchToggler/switchToggler";

import './headerStyle.css'

export function HeaderDesctop () {
    const [scroled, setScroled] = React.useState(false);
    useEffect(()=>{
        document.addEventListener('scroll',headerStyler);
        return ()=>{
            document.removeEventListener('scroll', headerStyler);
        }
    }, []);

  const  headerStyler = (event)=>{
        if (window.scrollY > 0) {
            setScroled(true)
        } else {
           setScroled(false)
        }
    };
        return (
            <DarkThemeContext.Consumer>
                {
                    (value)=>{
                        const {isDarkTheme, themeToggle} = value;
                        return (<div className={`container- justify-content-around d-flex header ${scroled? 'headerScroled' : ''} ${isDarkTheme? "bg-dark text-white": " bg-white text-dark" }`}>
                            <LogoHeader flag={scroled}/>
                            <NavBar flag={true}/>
                            <Search/>
                            <SwitchToggler flag={isDarkTheme} func={themeToggle} label='toggle theme'/>
                            <UserInfo flag={scroled}/>
                        </div>)
                    }
                }
            </DarkThemeContext.Consumer>
        );
}
