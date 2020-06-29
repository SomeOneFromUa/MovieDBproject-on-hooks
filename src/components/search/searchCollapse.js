import React from 'react';
import './searchStyle.css'

export function SearchCollapse(props) {
    const {searchList, flag} = props;
    const callBack = (prop)=>{
        const {func} = props;
        return ()=>{
            func && func(prop)
        }

    };
    return (
        <ul className="list-group fixed">
            {searchList.map(value =>  <li key={value.id}
                                         className={`list-group-item ${!flag.isDarkTheme? "bg-dark text-white": "bg-white text-dark"}`}
                                         onClick={callBack(value.name)}
            >
                {value.name}
            </li>)}
        </ul>
    );
}

