import React from "react";
import Style from "./NavBar.module.css";
import Menu from "./menu/menu";
import logo from '../../../Assets/img/icon/nav/logo.png'
import loginIcon from '../../../Assets/img/icon/nav/logout.png'
import shopIcon from '../../../Assets/img/icon/nav/shop.png'
import categoryIcon from '../../../Assets/img/icon/menu/categoria.png'
import { useScroll } from "../../../util/hook/landing/useScroll";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () =>{
  const navigate = useNavigate()
  const { scrollY } = useScroll()
    return(
      <header className={`${scrollY > 200 ? Style.scrolled_nav : Style.nav}`}>
        <NavLink to={'/'}>
          <img src={logo} alt="logo" className={Style.nav_logo}/>
        </NavLink>
        <Menu/>
        <div className={Style.nav_icon}>
          <img src={categoryIcon} alt="category" onClick={() => navigate('/catalogo')}/>
          <img src={shopIcon} alt="shop" onClick={() => navigate('/shoppingCart/cart')}/>
          <img src={loginIcon} alt="login" onClick={() => navigate('/login')}/>
        </div>
      </header> 
    )
}

export default NavBar;