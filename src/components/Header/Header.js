import React, {Component} from 'react';
import {LogoHeader} from "../logo/logo";
import {Search} from "../search/Search";
import {UserInfo} from "../UserInfo/userInfo";
import {NavBar} from "../NavBar/NavBar";

import './headerStyle.css'

export class Header extends Component {
    render() {
        return (
            <div className='sticky-top container- justify-content-around d-flex header'>
                <LogoHeader/>
                <div className='d-flex'>
                    <NavBar/>
                    <Search/>
                </div>

                <UserInfo/>
            </div>
        );
    }
}
