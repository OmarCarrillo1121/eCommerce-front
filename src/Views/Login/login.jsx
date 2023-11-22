// import React, { useState } from "react";
// import Style from "./login.module.css";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useField } from "../../util/hook/form/useField";
// import { useHandle } from "../../util/hook/common/useHandle";
// import Register from "../register/register";
// import Input from "../../components/input/input";
// import logo from "../../Assets/img/icon/nav/logo.png";
// import Button from "../../components/button/button";
// import Middle from "./middle/middle";
// import Services from "./services/services";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../config/firebase-config";

// export default function Login() {
//   const navigate = useNavigate();
//   const { handle, handleChange } = useHandle();
//   const email = useField({ type: "email" });
//   const password = useField({ type: "password" });

//   const [error, setError] = useState();

//   const submitHandler = async (event, email, password) => {
//     //event.preventDefault();
//     //if (!email) return alert("Ingresar email");
//     //if (!password) return alert("Ingresar password");
//     try {
//       const userCredentials = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log(userCredentials);
//       alert("Usuario logueado exitosamente");
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//       console.log(error);
//     }
//   };

//   return (
//     <form
//       onSubmit={() => submitHandler(email.value, password.value)}
//       autoComplete="off"
//       className={Style.form}
//     >
//       <NavLink to={"/"}>
//         <img src={logo} alt="logo" className={Style.form_logo} />
//       </NavLink>
//       {handle ? (
//         <section className={Style.form_login}>
//           <Services />
//           <article className={Style.form_interface}>
//             <Middle />
//             <Input userInfo={email} name="Email Adress" width={500} />
//             <Input userInfo={password} name="Password" width={500} />
//             <Button onClick={handleChange} children={"Register"} />
//             <Button
//               type="submit"
//               // onClick={() => submit(email.value, password.value)}
//               children={"Login"}
//             />
//           </article>
//         </section>
//       ) : (
//         <Register handleChange={handleChange} />
//       )}
//       <section className={Style.form_img}>
//         <span className={Style.form_exit_button} onClick={() => navigate("/")}>
//           X
//         </span>
//       </section>
//     </form>
//   );
// }

//****************************** */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";
//import { Alert } from "./Alert";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { authUser } from "../../redux/actions.js";
import { useDispatch } from "react-redux";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const login = async (email, password) => {
  //   const userCredentials = await signInWithEmailAndPassword(
  //     auth,
  //     email,
  //     password
  //   );
  //   console.log(userCredentials);
  //   return userCredentials;
  // };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log(userCredentials);
      const authUserInfo = userCredentials;
      dispatch(authUser(authUserInfo));
      alert("¡Logueado con exito!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      const userCredentials = await loginWithGoogle();
      console.log(userCredentials);
      const authUserInfo = userCredentials;
      dispatch(authUser(authUserInfo));
      alert("¡Logueado con exito!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  //console.log(user.email, user.password);
  console.log(error);

  return (
    <div className="w-full max-w-xs m-auto">
      {/* {error && <Alert message={error} />} */}

      <form onSubmit={handleSubmit} className="Form">
        <div className="div">
          <label htmlFor="email" className="Email label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="Email"
            placeholder="Ingrese email..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="Password label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="Password"
            placeholder="*************"
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="Sign in" type="submit">
            Sign In
          </button>
          <a className="Reset password" href="#!" onClick={handleResetPassword}>
            Forgot Password?
          </a>
        </div>
      </form>
      <button onClick={handleGoogleSignin} className="Google login">
        Google login
      </button>
      <p className="Register">
        Don't have an account?
        <Link to="/register" className="text-blue-700 hover:text-blue-900">
          Register
        </Link>
      </p>
    </div>
  );
}
