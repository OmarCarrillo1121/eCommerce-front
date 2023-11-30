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
import { authUserData } from "../../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import useLocalStorageCleaner from "../../../util/hook/clearLocalstorage/useLocalStorageClear.js";

const NavBar = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const dispatch = useDispatch();
  const clearLocalStorage = useLocalStorageCleaner("authUserInfo");
  const [userData, setUserData] = useState("");
  const { user } = useSelector((state) => state);

  const logout = async () => {
    await signOut(auth);
    dispatch(authUserData(null));
    clearLocalStorage();
    navigate("/");
    navigate(0);
  };

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  console.log(userData);

  return (
    <>
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

          {userData.rol === "user" ? (
            <div className={Style.nav_icon}>
              <p className={Style.nav_name}>{userData.name}</p>
              <button
                className={Style.form_button}
                style={{
                  width: `100px`,
                }}
                onClick={() => navigate(`/myProfile/${userData.id}`)}
              >
                Mi Perfil
              </button>
              <button
                className={Style.form_button}
                style={{
                  width: `100px`,
                }}
                onClick={() => logout()}
              >
                Cerrar sesión
              </button>
            </div>
          ) : userData && userData.rol === "admin" ? (
            <div className={Style.nav_icon}>
              <p className={Style.nav_name}>{userData.name}</p>
              <button
                className={Style.form_button}
                style={{
                  width: `100px`,
                }}
                onClick={() => navigate("/dashboard/dashboard")}
              >
                Dashboard
              </button>
              <button
                className={Style.form_button}
                style={{
                  width: `100px`,
                }}
                onClick={() => logout()}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className={Style.nav_icon}>
              <button
                className={Style.form_button}
                style={{
                  width: `100px`,
                }}
                onClick={() => navigate("/login")}
              >
                {" "}
                Iniciar sesión{" "}
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
