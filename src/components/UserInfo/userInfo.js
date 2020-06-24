import React from 'react';
import {User} from "../../constants";

import './UserInfoStyle.css'

export function UserInfo (props) {
        const {flag} = props;
        const {avatar, username} = User;
        return (
            <div className='UserInfo'>
                <img className={`rounded-circle ${flag? 'userAvatarScroled' : "userAvatar"}`} src={avatar} alt="Circle"/>
                <h5 className='userNameStyle'>{username}</h5>
            </div>
        );
}

