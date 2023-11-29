import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "./login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useField } from "../../util/hook/form/useField";
import { useHandle } from "../../util/hook/common/useHandle";
import Register from "../register/register";
import Input from "../../components/input/input";
import logo from "../../Assets/img/icon/nav/logo.png";
import Button from "../../components/button/button";
import Middle from "./middle/middle";
import Services from "./services/services";
import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authUserData, saveStateToLocalStorage } from "../../redux/actions.js";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../util/hook/localStorage/localStorage";

export default function Login() {
  const { handle, handleChange } = useHandle();

  const email = useField({ type: "email" });
  const password = useField({ type: "password" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const URL_GAMES = "https://ecomercestorebacken.vercel.app";
  // const URL_GAMES = "http://localhost:3001";

  // const [storedAuthUserInfo, setStoredAuthUserInfo] = useLocalStorage(
  //   "authUserInfo",
  //   null
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      if (userCredentials) {
        const userEmail = userCredentials.user.email;
        const userData = await axios.get(
          `${URL_GAMES}/users/search/email?email=${userEmail}`
        );
        const userInfo = userData.data;
        dispatch(authUserData(userInfo[0]));
        // dispatch(saveStateToLocalStorage(userInfo));
        // setStoredAuthUserInfo(userInfo);
        //localStorage.setItem("authUserInfo", JSON.stringify(userInfo));
        alert("¡Logueado con éxito!");
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  console.log(error);

  return (
    <form autoComplete="off" className={Style.form}>
      <NavLink to={"/"}>
        <img src={logo} alt="logo" className={Style.form_logo} />
      </NavLink>
      {handle ? (
        <section className={Style.form_login}>
          <Services />
          <article className={Style.form_interface}>
            <Middle />
            <Input userInfo={email} name="Email" width={500} />
            <Input userInfo={password} name="Password" width={500} />
            <Button onClick={handleChange} children={"Register"} />
            <Button onClick={handleSubmit} children={"Login"} />
          </article>
          <NavLink to={"/resetPassword"}>
            <p className={Style.form_p} style={{ textDecoration: "none" }}>
              Olvidaste la contraseña?
            </p>
          </NavLink>
        </section>
      ) : (
        <Register handleChange={handleChange} />
      )}

      <section className={Style.form_img}>
        <span className={Style.form_exit_button} onClick={() => navigate("/")}>
          X
        </span>
      </section>
    </form>
  );
}
