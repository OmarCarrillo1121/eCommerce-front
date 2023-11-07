import React from "react";
import Style from "./NavBar.module.css";
import Menu from "./menu/menu";
import logo from '../../../Assets/img/icon/nav/logo.png'
import loginIcon from '../../../Assets/img/icon/nav/login.png'
import shopIcon from '../../../Assets/img/icon/nav/shop.png'
import { useScroll } from "../../../util/hook/landing/useScroll";

const NavBar = () =>{
  const { scrollY } = useScroll()
    return(
      <header className={`${scrollY > 200 ? Style.scrolled_nav : Style.nav}`}>
        <img src={logo} alt="logo" className={Style.nav_logo}/>
        <Menu/>
        <div className={Style.nav_icon}>
          <img src={shopIcon} alt="shop"/>
          <img src={loginIcon} alt="login"/>
        </div>
      </header> 
    )
}

export default NavBar;