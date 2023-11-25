import React, { useState } from "react";
import Style from "./services.module.css";
import { auth } from "../../../config/firebase-config.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authUser, saveStateToLocalStorage } from "../../../redux/actions.js";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState();

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const googleProvider = new GoogleAuthProvider();
      const authUserInfo = await signInWithPopup(auth, googleProvider);
      dispatch(authUser(authUserInfo));
      dispatch(saveStateToLocalStorage(authUserInfo));
      alert("¡Logueado con exito!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  return (
    <article className={Style.services}>
      <h1>Log in</h1>
      <div className={Style.services_icons}>
        <button onClick={loginWithGoogle} className={Style.google_login_btn}>
          Login with google
        </button>
      </div>
    </article>
  );
};

export default Services;
