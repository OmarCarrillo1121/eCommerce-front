// import React, { useState } from "react";
// import Style from "./register.module.css";
// import Input from "../../components/input/input";
// import Button from "../../components/button/button";
// import { useField } from "../../util/hook/form/useField";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../config/firebase-config";
// import { useNavigate } from "react-router-dom";

// export default function Register({ handleChange }) {
//   // las variables de useField tienen la propiedad value y onChange, para acceder a sus valores o modificarlos, por ej: emanil.value o userName.onChange
//   const userName = useField({ type: "user" });
//   const email = useField({ type: "text" });
//   const password = useField({ type: "password" });
//   const adress = useField({ type: "adress" });

//   const [error, setError] = useState();
//   const navigate = useNavigate();

//   const signup = async (event, email, password) => {
//     //event.preventDefault();
//     //if (!email) return alert("Ingresar email");
//     //if (!password) return alert("Ingresar password");
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Usuario creado exitosamente");
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   // const signup = (email, password) => {
//   //   alert(JSON.stringify(email, password));
//   // };

//   console.log(email.value, password.value);

//   return (
//     <div className={Style.form_register}>
//       <h1>Register</h1>
//       <div className={Style.form_register_inp}>
//         <Input userInfo={userName} name={"User Name"} width={250} />
//         <Input userInfo={email} name={"Email Adress"} width={250} />
//         <Input userInfo={password} name={"Password"} width={250} />
//         <Input userInfo={adress} name={"Adress"} width={250} />
//         <div className={Style.form_register_button}>
//           <Button children={"Atras"} onClick={handleChange} />
//           <Button
//             children={"Register"}
//             onClick={() => signup(email.value, password.value)}
//           />
//           {error && <p>{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

//************************************************** */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";
//import { Alert } from "./Alert";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { authUser } from "../../redux/actions.js";
import { useDispatch } from "react-redux";

export default function Register() {
  //const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log(userCredentials);
      const authUserInfo = userCredentials;
      dispatch(authUser(authUserInfo));
      alert("¡Usuario creado con exito!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="div">
      {/* {error && <Alert message={error} />} */}

      <form onSubmit={handleSubmit} className="form">
        <div className="mb-4">
          <label htmlFor="email" className="email">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="email"
            placeholder="Ingrese email..."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="password">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="Password"
            placeholder="*************"
          />
        </div>

        <button className="Register">Register</button>
      </form>
      <p className="Forgot">
        Already have an Account?
        <Link to="/login" className="Link login">
          Login
        </Link>
      </p>
    </div>
  );
}
