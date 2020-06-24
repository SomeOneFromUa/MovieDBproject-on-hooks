import React, {useContext} from 'react';
import {HeaderDesctop} from "./headerDesctop";
import {ViewPoints} from "../../context/wrappers/DetectViewPortWrapper";
import {ViewPortContext} from "../../context/contexts";
import {HeaderMobile} from "./headerMobile";

export function Header () {
        const curViewPort = useContext(ViewPortContext);
        return (
            <div className='sticky-top'>
                {curViewPort === ViewPoints.desctop && <HeaderDesctop/>}
                {(curViewPort === ViewPoints.tablet || curViewPort === ViewPoints.phone) && <HeaderMobile/>}
            </div>
        );
}