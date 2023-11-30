import React, { useState } from "react";
import axios from "axios";
import Style from "./register.module.css";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useField } from "../../util/hook/form/useField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/actions.js";

export default function Register({ handleChange }) {
  // las variables de useField tienen la propiedad value y onChange, para acceder a sus valores o modificarlos, por ej: emanil.value o userName.onChange
  const userName = useField({ type: "user" });
  const email = useField({ type: "email" });
  const password = useField({ type: "password" });
  //const adress = useField({ type: "adress" });
  const URL_GAMES = "https://ecomercestorebacken.vercel.app";
  // const URL_GAMES = "http://localhost:3001";

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = {
        name: userName.value,
        email: email.value,
        password: password.value,
      };
      await axios.post(`${URL_GAMES}/users`, user);
      alert("¡Usuario creado con exito, ahora podés iniciar sesión!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  return (
    <div className={Style.form_register}>
      <h1>Registrate</h1>
      <div className={Style.form_register_inp}>
        <Input userInfo={userName} name={"Username"} width={500} />
        <Input userInfo={email} name={"Email"} width={500} />
        <Input userInfo={password} name={"Password"} width={500} />
        <div className={Style.form_register_button}>
          <Button children={"Atras"} onClick={handleChange} />
          <Button children={"Register"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
