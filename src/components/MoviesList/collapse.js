import React, {Component} from 'react';
import {ListGroupItem} from 'reactstrap';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";


class CollapseComponent extends Component {

  render() {
      const {arr, curGenre} = this.props;
      if (!arr) return ;
      return (
          <div  className=' p-3'>
              {arr.map(value =>
                  <ListGroupItem  key={value.id} className={+curGenre === value.id? 'bg-primary text-white': ''}>
                  <NavLink className={+curGenre === value.id? ' text-white': ''} to={`/page/1?genre=${value.id}`}>{value.name}</NavLink>
                  </ListGroupItem>
              )}
          </div>
      )

  }




}

const masStateToProps = (store)=>{
    const {mainReducer: {curGenre}} = store
    return{
        curGenre
    }
}
export const Collapse = connect(masStateToProps)(CollapseComponent);


