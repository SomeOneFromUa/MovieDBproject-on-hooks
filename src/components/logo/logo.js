import React from "react";

import Logo from '../../assets/logo.jpg'
import './logo.css'
import {Link} from "react-router-dom";


export function LogoHeader () {
return(
    <div className='m-2 d-flex'>
        <img src={Logo} alt="logo" className='logoImage align-self-center'/>
        <div className='align-self-center'>
            <h3>MovieDB</h3>
            <h6>react app</h6>
            <Link to='/page/1'>HOME</Link>
        </div>
    </div>
)
}