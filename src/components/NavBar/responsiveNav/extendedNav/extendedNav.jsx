import React from "react";
import Style from './extendedNav.module.css'
import { useNavigate } from "react-router-dom";
import pcIcon from '../../../../Assets/img/icon/menu/pc.png'
import psIcon from '../../../../Assets/img/icon/menu/ps.png'
import xboxIcon from '../../../../Assets/img/icon/menu/xbox.png'
import nintendoIcon from '../../../../Assets/img/icon/menu/nintendo.png'
import shopIcon from '../../../../Assets/img/icon/nav/shop.png'
import loginIcon from '../../../../Assets/img/icon/nav/logout.png'
import { Platform } from "../../navbar/menu/menu";

const ExtendedNav = ({ handleChange }) => {
    const navigate = useNavigate()
    return (
        <div className={Style.extended_nav}>
            <Platform img={pcIcon} tittle={'PC'} mt={100}/>
            <Platform img={psIcon} tittle={'PC'} mt={20}/>
            <Platform img={xboxIcon} tittle={'PC'} mt={20}/>
            <Platform img={nintendoIcon} tittle={'PC'} mt={20}/>
            <div className={Style.nav_icon} onClick={() => {navigate('/login'); handleChange()}}>
                <img src={loginIcon} alt="login"/>
                <h2>Account</h2>
            </div>
            <div className={Style.nav_icon_shop} onClick={() => {navigate('/login'); handleChange()}}>
                <img src={shopIcon} alt="shop"/>
                <h2>Shop</h2>
            </div>
        </div>
    )
}

export default ExtendedNav