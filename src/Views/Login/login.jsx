import React, { useState } from "react";
import Style from "./login.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authUser } from "../../redux/actions.js";
import { useDispatch } from "react-redux";

export default function Login() {
  const { handle, handleChange } = useHandle();

  const email = useField({ type: "email" });
  const password = useField({ type: "password" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState();

  const loginWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      return await signInWithPopup(auth, googleProvider);
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
      dispatch(authUser(authUserInfo));
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

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState();

//   const loginWithGoogle = () => {
//     const googleProvider = new GoogleAuthProvider();
//     return signInWithPopup(auth, googleProvider);
//   };

//   const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const userCredentials = await signInWithEmailAndPassword(
//         auth,
//         user.email,
//         user.password
//       );
//       console.log(userCredentials);
//       const authUserInfo = userCredentials;
//       dispatch(authUser(authUserInfo));
//       alert("¡Logueado con exito!");
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//       alert(error.message);
//     }
//   };

//   const handleChange = ({ target: { value, name } }) =>
//     setUser({ ...user, [name]: value });

//   const handleGoogleSignin = async () => {
//     try {
//       const userCredentials = await loginWithGoogle();
//       console.log(userCredentials);
//       const authUserInfo = userCredentials;
//       dispatch(authUser(authUserInfo));
//       alert("¡Logueado con exito!");
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (!user.email) return setError("Write an email to reset password");
//     try {
//       await resetPassword(user.email);
//       setError("We sent you an email. Check your inbox");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   console.log(error);

//   return (
//     <form onSubmit={handleSubmit} autoComplete="off" className={Style.form}>
//       <NavLink to={"/"}>
//         <img src={logo} alt="logo" className={Style.form_logo} />
//       </NavLink>
//       <section className={Style.form_login}>
//         <article className={Style.form_interface}>
//           {/* <Middle /> */}
//           <div className={Style.group}>
//             <label htmlFor="email" className={Style.label}>
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               onChange={handleChange}
//               className={Style.input}
//               placeholder=""
//             />
//           </div>
//           <div className={Style.group}>
//             <label htmlFor="password" className={Style.label}>
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               onChange={handleChange}
//               className={Style.input}
//               placeholder=""
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button className="Sign in" type="submit">
//               Sign In
//             </button>
//             <a
//               className="Reset password"
//               href="#!"
//               onClick={handleResetPassword}
//             >
//               Forgot Password?
//             </a>
//             <button
//               onClick={handleGoogleSignin}
//               className={Style.form_button}
//               // style={{
//               //   width: `${viewportWidth <= 800 ? 150 + "px" : width + "px"}`,
//               // }}
//             >
//               Google login
//             </button>
//             <p className="Register">
//               Don't have an account?
//               <Link
//                 to="/register"
//                 className="text-blue-700 hover:text-blue-900"
//               >
//                 Register
//               </Link>
//             </p>
//           </div>
//         </article>
//       </section>
//       <section className={Style.form_img}>
//         <span className={Style.form_exit_button} onClick={() => navigate("/")}>
//           X
//         </span>
//       </section>
//     </form>
//   );
// }

// //****************************** */
// // export default function Login() {

// //   //console.log(user.email, user.password);

// //   return (
// //     <div className="w-full max-w-xs m-auto">
// //       {/* {error && <Alert message={error} />} */}

// //       <form onSubmit={handleSubmit} className="Form">
// // <div className="div">
// //   <label htmlFor="email" className="Email label">
// //     Email
// //   </label>
// //   <input
// //     type="email"
// //     name="email"
// //     id="email"
// //     onChange={handleChange}
// //     className="Email"
// //     placeholder="Ingrese email..."
// //   />
// // </div>
// // <div className="mb-4">
// //   <label htmlFor="password" className="Password label">
// //     Password
// //   </label>
// //   <input
// //     type="password"
// //     name="password"
// //     id="password"
// //     onChange={handleChange}
// //     className="Password"
// //     placeholder="*************"
// //   />
// // </div>

// //         <div className="flex items-center justify-between">
// //           <button className="Sign in" type="submit">
// //             Sign In
// //           </button>
// //           <a className="Reset password" href="#!" onClick={handleResetPassword}>
// //             Forgot Password?
// //           </a>
// //         </div>
// //       </form>
// //       <button onClick={handleGoogleSignin} className="Google login">
// //         Google login
// //       </button>
// //       <p className="Register">
// //         Don't have an account?
// //         <Link to="/register" className="text-blue-700 hover:text-blue-900">
// //           Register
// //         </Link>
// //       </p>
// //     </div>
// //   );
// // }
