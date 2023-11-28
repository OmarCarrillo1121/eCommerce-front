import React, { useState, useEffect } from "react";
import Style from "./NavBar.module.css";
import Menu from "./menu/menu";
import logo from "../../../Assets/img/icon/nav/logo.png";
import loginIcon from "../../../Assets/img/icon/nav/logout.png";
import shopIcon from "../../../Assets/img/icon/nav/shop.png";
import categoryIcon from "../../../Assets/img/icon/menu/categoria.png";
import { useScroll } from "../../../util/hook/landing/useScroll";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase-config";
import { authUser } from "../../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import useLocalStorageCleaner from "../../../util/hook/clearLocalstorage/useLocalStorageClear.js";

const NavBar = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const dispatch = useDispatch();
  const clearLocalStorage = useLocalStorageCleaner("authUserInfo");
  const [userRol, setUserRol] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("authUserInfo"));

  // const userRol = () => {
  //   if (userInfo) {
  //     const usrRol = userInfo[0].rol;
  //     return usrRol;
  //   }
  // };

  const logout = async () => {
    await signOut(auth);
    dispatch(authUser(null));
    clearLocalStorage();
    navigate("/");
  };

  useEffect(() => {
    if (userInfo) {
      setUserRol(userInfo[0].rol);
    }
  }, [userRol]);

  console.log(userRol);

  return (
    <header className={`${scrollY > 200 ? Style.scrolled_nav : Style.nav}`}>
      <NavLink to={"/"}>
        <img src={logo} alt="logo" className={Style.nav_logo} />
      </NavLink>
      <Menu />
      <div className={Style.nav_icon}>
        <img
          src={categoryIcon}
          alt="category"
          onClick={() => navigate("/catalogo")}
        />
        <img src={shopIcon} alt="shop" onClick={() => navigate("/carrito")} />
        {/* //!EDWARD */}

        {userInfo ? (
          <div>
            <img
              src={loginIcon}
              alt="login"
              onClick={() => navigate("/login")}
            />
            <p>{userInfo[0].name}</p>
            <button onClick={() => logout()}>Cerrar sesión</button>
          </div>
        ) : (
          <p onClick={() => navigate("/login")}> Login </p>
        )}
      </div>
    </header>
  );
};

export default NavBar;
