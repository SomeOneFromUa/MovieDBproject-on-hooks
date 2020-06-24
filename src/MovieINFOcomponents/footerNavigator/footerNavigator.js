import React from 'react';
import {withRouter} from "react-router";
import './FooterStyle.scss'

function FooterNavigatorComponent (props) {
   const onBack = ()=>{
        const {history} = props;
        history.go(-1)
    };
        return (
         <div className="bg-info w-100 p-0 m-0 footerNav">
             <button onClick={onBack} className='btn btn-dark m-3'>back</button>
         </div>
        );
}

export const FooterNavigator = withRouter(FooterNavigatorComponent);
