import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {clearOnHome} from "../../store/actions";


export class NavBarComponent extends Component {
    state = {
        isNEW: false
    };
    CleareHomePage = ()=>{
        const {clearOnHome} = this.props;
        clearOnHome();
    };
    Watched =()=>{
        this.setState({
            isNEW: false
        })
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.favorites.length > prevProps.favorites.length){
            this.setState({
                isNEW: true
            })
        }else return
    }

    render() {
        const {isNEW} = this.state;
        return (
            <nav className="navbar navbar-expand-lg navbar-light">

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link onClick={this.CleareHomePage} className="nav-link" to='/page/1'> <h4>Home</h4></Link>
                    </li>
                    <li className="nav-item d-flex align-items-center">
                        <Link className="nav-link" onClick={this.Watched} to='/favorites'> <h4>Favorites</h4></Link>
                        {isNEW && <div className='badge badge-warning'><h6>new</h6></div>}

                    </li>
                </ul>
            </div>
        </nav>

        );
    }
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
export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarComponent)