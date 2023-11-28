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
import { UserMenu } from "../UserMenu/UserMenu.jsx";

const NavBar = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const dispatch = useDispatch();
  const clearLocalStorage = useLocalStorageCleaner("authUserInfo");
  const [userRol, setUserRol] = useState("");
  const [userData, setUserData] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("authUserInfo"));

  const isLogged = () => {
    if (userInfo) {
      return true;
    } else {
      return false;
    }
  };

  const isAdmin = () => {
    if (userInfo) {
      if (userInfo[0].rol === "admin") {
        return true;
      } else {
        return false;
      }
    }
  };

  const userId = () => {
    if (userInfo) {
      return userInfo[0].id;
    } else {
      return false;
    }
  };

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
      setUserData(userInfo[0]);
    }
  }, [userRol]);

  //console.log(userRol);
  console.log(userData);

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
        {isLogged() ? (
          <div>
            <p>{userInfo[0].name}</p>
            {isAdmin() ? (
              <button onClick={() => navigate("/dashboard/dashboard")}>
                Dashboard
              </button>
            ) : (
              <button onClick={() => navigate("/user/:1")}>Mi Perfil</button>
            )}

            <button onClick={() => logout()}>Cerrar sesión</button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate("/login")}> Login </button>
            <button onClick={() => navigate("/register")}> Register </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
