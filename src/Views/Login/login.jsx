import React, { useState } from "react";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export default function Login() {
  const navigate = useNavigate();
  const { handle, handleChange } = useHandle();
  const email = useField({ type: "email" });
  const password = useField({ type: "password" });

  const [error, setError] = useState();

  const submitHandler = async (event, email, password) => {
    //event.preventDefault();
    //if (!email) return alert("Ingresar email");
    //if (!password) return alert("Ingresar password");
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      alert("Usuario logueado exitosamente");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={() => submitHandler(email.value, password.value)}
      autoComplete="off"
      className={Style.form}
    >
      <NavLink to={"/"}>
        <img src={logo} alt="logo" className={Style.form_logo} />
      </NavLink>
      {handle ? (
        <section className={Style.form_login}>
          <Services />
          <article className={Style.form_interface}>
            <Middle />
            <Input userInfo={email} name="Email Adress" width={500} />
            <Input userInfo={password} name="Password" width={500} />
            <Button onClick={handleChange} children={"Register"} />
            <Button
              type="submit"
              // onClick={() => submit(email.value, password.value)}
              children={"Login"}
            />
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
