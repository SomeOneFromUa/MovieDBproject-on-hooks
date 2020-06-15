import React, {Component} from 'react';

export class NavBar extends Component {
    render() {
        return (
            <div className="pos-f-t align-self-center" >

                <nav className="navbar navbar-light bg-light ">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
            </div>
        );
    }
}
