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
import { authUser} from "../../../redux/actions.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../util/hook/localStorage/localStorage.js"

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ storedUser, setStoredUser ] = useLocalStorage("user", null)

  const [error, setError] = useState();

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const googleProvider = new GoogleAuthProvider();
      const authUserInfo = await signInWithPopup(auth, googleProvider);
      dispatch(authUser(authUserInfo));
      setStoredUser(authUserInfo); // Guarda el usuario en el localStorage
      alert("¡Logueado con éxito!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
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
