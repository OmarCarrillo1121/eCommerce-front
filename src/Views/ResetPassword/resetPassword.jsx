import React, { useState, useEffect } from "react";
import Style from "./resetPassword.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useField } from "../../util/hook/form/useField.js";
import Input from "../../components/input/input.jsx";
import logo from "../../Assets/img/icon/nav/logo.png";
import Button from "../../components/button/button.jsx";
import { auth } from "../../config/firebase-config.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";

export default function ResetPassword() {
  const email = useField({ type: "email" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email.value) return setError("Write an email to reset password");
    try {
      await resetPassword(email.value);
      alert(
        "¡Revisa tu correo y sigue las instrucciones para restablecer tu contraseña!"
      );
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

      <section className={Style.form_login}>
        <article className={Style.form_interface}>
          <h1>Reestablecer contraseña</h1>
          <Input userInfo={email} name="Email" width={500} />
          <NavLink to={"/login"}>
            <Button children={"Atras"} />
          </NavLink>
          <Button
            onClick={handleResetPassword}
            children={"Restablecer contraseña"}
          />
        </article>
      </section>

      <section className={Style.form_img}>
        <span className={Style.form_exit_button} onClick={() => navigate("/")}>
          X
        </span>
      </section>
    </form>
  );
}
