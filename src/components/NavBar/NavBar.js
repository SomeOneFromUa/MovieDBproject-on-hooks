import React, {Component} from 'react';
import {Link} from "react-router-dom";

export class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/page/1'> <h4>Home</h4></Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"> <h4>Link</h4></a>
                    </li>
                </ul>
            </div>
        </nav>

        );
    }
}
