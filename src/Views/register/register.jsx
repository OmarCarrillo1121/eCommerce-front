import React, { useState } from "react";
import Style from "./register.module.css";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useField } from "../../util/hook/form/useField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Register({ handleChange }) {
  // las variables de useField tienen la propiedad value y onChange, para acceder a sus valores o modificarlos, por ej: emanil.value o userName.onChange
  const userName = useField({ type: "user" });
  const email = useField({ type: "text" });
  const password = useField({ type: "password" });
  const adress = useField({ type: "adress" });

  const [error, setError] = useState();
  const navigate = useNavigate();

  const signup = async (event, email, password) => {
    //event.preventDefault();
    //if (!email) return alert("Ingresar email");
    //if (!password) return alert("Ingresar password");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario creado exitosamente");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // const signup = (email, password) => {
  //   alert(JSON.stringify(email, password));
  // };

  console.log(email.value, password.value);

  return (
    <div className={Style.form_register}>
      <h1>Register</h1>
      <div className={Style.form_register_inp}>
        <Input userInfo={userName} name={"User Name"} width={250} />
        <Input userInfo={email} name={"Email Adress"} width={250} />
        <Input userInfo={password} name={"Password"} width={250} />
        <Input userInfo={adress} name={"Adress"} width={250} />
        <div className={Style.form_register_button}>
          <Button children={"Atras"} onClick={handleChange} />
          <Button
            children={"Register"}
            onClick={() => signup(email.value, password.value)}
          />
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}
