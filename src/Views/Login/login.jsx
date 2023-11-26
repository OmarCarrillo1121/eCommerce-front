import React, { useState, useEffect } from "react";
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
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authUser, saveStateToLocalStorage } from "../../redux/actions.js";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../util/hook/localStorage/localStorage";

export default function Login() {
  const { handle, handleChange } = useHandle();

  const email = useField({ type: "email" });
  const password = useField({ type: "password" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [storedAuthUserInfo, setStoredAuthUserInfo] = useLocalStorage(
    "authUserInfo",
    null
  );

  // useEffect(() => {

  //   if (storedAuthUserInfo) {

  //     alert('Bienvenido de nuevo, ' + storedAuthUserInfo.email + '!');
  //   }
  // }, [storedAuthUserInfo]);

  const loginWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const authUserInfo = userCredentials.user; // Accede a la propiedad 'user'
      // dispatch(authUser(authUserInfo));
      // dispatch(saveStateToLocalStorage(authUserInfo));
      // setStoredAuthUserInfo(authUserInfo);
      alert("¡Logueado con éxito!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const resetPassword = async (email) =>
    await sendPasswordResetEmail(auth, email);

  const handleGoogleSignin = async () => {
    try {
      const userCredentials = await loginWithGoogle();
      console.log(userCredentials);
      const authUserInfo = userCredentials;
      // dispatch(authUser(authUserInfo));
      // dispatch(saveStateToLocalStorage(authUserInfo));
      alert("¡Logueado con exito!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const authUserInfo = userCredentials.user; // Accede a la propiedad 'user'
      // dispatch(authUser(authUserInfo));
      // dispatch(saveStateToLocalStorage(authUserInfo));
      // setStoredAuthUserInfo(authUserInfo);
      alert("¡Logueado con éxito!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email.value) return setError("Write an email to reset password");
    try {
      await resetPassword(email.value);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
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
