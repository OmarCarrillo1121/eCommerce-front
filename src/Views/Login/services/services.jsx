import React, { useState } from "react";
import axios from "axios";
import Style from "./services.module.css";
import { auth } from "../../../config/firebase-config.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  authUser,
  postUser,
  saveStateToLocalStorage,
} from "../../../redux/actions.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../util/hook/localStorage/localStorage.js";
import { authUserData } from "../../../redux/actions.js";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [storedAuthUserInfo, setStoredAuthUserInfo] = useLocalStorage(
  //   "authUserInfo",
  //   null
  // );
  const [error, setError] = useState();

  const URL_GAMES = "https://ecomercestorebacken.vercel.app";
  // const URL_GAMES = "http://localhost:3001";

  const searchUserByMail = async (userEmail) => {
    try {
      const searchedUser = await axios.get(
        `${URL_GAMES}/users/search/email?email=${userEmail}`
      );
      return searchedUser;
    } catch (error) {
      return "failure";
      //console.log(error.message);
    }
  };

  const checkRegister = async () => {
    const googleProvider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth, googleProvider);
    const userEmail = userCredentials.user.email;
    const response = await searchUserByMail(userEmail);
    if (response === "failure") {
      const postedUserInfo = {
        name: userCredentials.user.displayName,
        email: userCredentials.user.email,
        password: userCredentials.user.uid,
        image: userCredentials.user.photoURL,
        google: true,
      };
      await axios.post(`${URL_GAMES}/users`, postedUserInfo).then(
        (res) => dispatch(authUserData(res.data))
        //localStorage.setItem("authUserInfo", JSON.stringify(res.data))
      );
      alert("¡Inicio de sesión exitoso!");
      navigate("/");
      navigate(0);
    } else {
      // const userInfo = response.data;
      // dispatch(authUser(userInfo));
      // dispatch(saveStateToLocalStorage(userInfo));
      // setStoredAuthUserInfo(userInfo);
      // alert("¡Logueado con éxito!");
      // console.log("Secret");
      // navigate("/");
      const userInfo = response.data;
      dispatch(authUserData(userInfo[0]));
      // dispatch(authUser(userInfo));
      // dispatch(saveStateToLocalStorage(userInfo));
      // setStoredAuthUserInfo(userInfo);
      alert("¡Logueado con éxito!");
      navigate("/");
      navigate(0);
    }
    return response;
  };

  // const isRegistered = async () => {
  //   const googleProvider = new GoogleAuthProvider();
  //   const userCredentials = await signInWithPopup(auth, googleProvider);
  //   const userEmail = userCredentials.user.email;
  //   const response = await searchUserByMail(userEmail);
  //   return response;
  // };

  // const isNotRegistered = async () => {
  //   const googleProvider = new GoogleAuthProvider();
  //   const userCredentials = await signInWithPopup(auth, googleProvider);
  //   const userEmail = userCredentials.user.email;
  //   const response = await searchUserByMail(userEmail);
  //   return response;
  // };

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    await checkRegister();
    // const userExists = await checkRegister();
    // if (userExists === "failure") {
    //   console.log("todo mal");
    // } else {
    //   isRegistered();
    // }
    // console.log(userExists);
    // try {
    //   const googleProvider = new GoogleAuthProvider();
    //   const userCredentials = await signInWithPopup(auth, googleProvider);
    //   if (userCredentials) {
    //     const userEmail = userCredentials.user.email;
    //     const isRegisteredValue = isRegistered();
    //     console.log(isRegisteredValue);
    // if (userData) {
    //   console.log("Secret");
    // const userInfo = userData.data;
    // dispatch(authUser(userInfo));
    // dispatch(saveStateToLocalStorage(userInfo));
    // setStoredAuthUserInfo(userInfo);
    // alert("¡Logueado con éxito!");
    // navigate("/");
    // } else {
    //   console.log("Secret");
    // postUser({
    //   name: userCredentials.user.displayName,
    //   email: userCredentials.user.email,
    //   password: userCredentials.user.uid,
    //   image: userCredentials.user.photoURL,
    //   google: true,
    // });
    // const userInfo = userData.data;
    // dispatch(authUser(userInfo));
    // dispatch(saveStateToLocalStorage(userInfo));
    // setStoredAuthUserInfo(userInfo);
    // alert("¡Logueado con éxito!");
    // console.log("Secret");
    // navigate("/");
    // }
    // }
    // dispatch(authUser(authUserInfo));
    // setStoredUser(authUserInfo); // Guarda el usuario en el localStorage
    // alert("¡Logueado con éxito!");
    // navigate("/");
    // } catch (error) {
    //   setError(error.message);
    //   alert(error.message);
    // }
    return "success";
  };

  return (
    <article className={Style.services}>
      <h1>Usuario Registrado</h1>
      <div className={Style.services_icons}>
        <button onClick={loginWithGoogle} className={Style.google_login_btn}>
          ingresar con google
        </button>
      </div>
    </article>
  );
};

export default Services;
