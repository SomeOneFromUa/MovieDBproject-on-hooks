import React, {Component} from 'react';
import {User} from "../../constants";

import './UserInfoStyle.css'

export class UserInfo extends Component {
    render() {
        const {avatar, username} = User;
        return (
            <div className='m-2 d-flex'>
                <img className="rounded-circle userAvatar align-self-center" src={avatar} alt="Circle image"/>
                <h5 className=' align-self-center m-2'>{username}</h5>
            </div>
        );
    }
}

