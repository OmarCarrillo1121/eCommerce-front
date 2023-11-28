import { Routes, Route, useLocation } from "react-router-dom";
import { useWindow } from "./util/hook/window/useWindow";
import Landing from "./Views/Landing/Landing";
import NavBar from "./components/NavBar/navbar/NavBar";
import Login from "./Views/Login/login";
import Register from "./Views/register/register";
import ResetPassword from "./Views/ResetPassword/resetPassword";
import Footer from "./Views/footer/footer";
import Section from "./Views/section/section";
import Detail from "./Views/Detail/Detail";
import FormVideogame from "./components/Formulary/FormVideogame/FormVideogame";
import EditVideogame from "./components/Formulary/FormVideogame/EditVideogame";
import Catalogo from "./components/Catalogo/Catalogo";
import ResponsiveNav from "./components/NavBar/responsiveNav/resposiveNav";
import Account from "./Views/Dashboard/account";
import Error404 from "./Views/Error404/Error404";

//⭐
//import Orders from "./Views/Dashboard/accountNav/links/ordersDash/ordersDash";
import DetailOrders from "./Views/Dashboard/accountNav/links/dashboard/DetailOrders/DetailOrdes";
import CancelledOrders from "./Views/Dashboard/accountNav/links/CancelledOrders/CancelledOrders";
import ActiveOrders from "./Views/Dashboard/accountNav/links/ActiveOrders/ActiveOrders";

import "./App.css";
import DetailUser from "./Views/Detail/detailUser/DetailUser";
import Checkout from "./Views/Checkout/checkout";
import "./App.css";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import Contact from "./Views/Contact/Contact";
import AboutUs from "./Views/AboutUs/AboutUs";
import { authUser } from "./redux/actions";

function App() {
  const location = useLocation();
  const { viewportWidth } = useWindow();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      alert(currentUser);
    });
  }, []);

  const [items, setItems] = useState([1, 2, 3]);

  const [isAdmin, setIsAdmin] = useState(true);

  // useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(items));
  // }, [items]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem("items"));
  //   if (items) {
  //     setItems(items);
  //   }
  // }, []);

  useEffect(() => {
    const authUserFromLS = JSON.parse(localStorage.getItem("authUserInfo"));
    authUser(authUserFromLS);
  }, []);

  //console.log(JSON.parse(localStorage.getItem("authUserInfo")));

  return (
    <div className="app">
      {(location.pathname === "/" ||
        location.pathname.includes("/detail") ||
        location.pathname === "/catalogo" ||
        location.pathname === "/detail/:id") &&
      viewportWidth >= 800 ? (
        <NavBar />
      ) : null}
      {viewportWidth <= 800 && <ResponsiveNav />}
      <Routes>
        <Route path="/" element={[<Landing key={1} />, <Section key={2} />]} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/user/:id" element={<DetailUser />} />
        <Route path="/checkout" element={<Checkout />} />
        {isAdmin ? (
          <>
            <Route path="/dashboard/:id" element={<Account />} />
            <Route path="/formVideogame" element={<FormVideogame />} />
            <Route path="/editVideogame/:id" element={<EditVideogame />} />
            <Route path="/dashboard/Orders/:id" element={<DetailOrders />} />
            <Route
              path="/dashboard/Orders/cancel"
              element={<CancelledOrders />}
            />
            <Route path="/dashboard/Orders/active" element={<ActiveOrders />} />
          </>
        ) : (
          <>
            <Route path="/dashboard/:id" element={<Error404 />} />
            <Route path="/formVideogame" element={<Error404 />} />
            <Route path="/editVideogame/:id" element={<Error404 />} />
            <Route path="/dashboard/Orders/:id" element={<Error404 />} />
            <Route path="/dashboard/Orders/cancel" element={<Error404 />} />
            <Route path="/dashboard/Orders/active" element={<Error404 />} />
          </>
        )}
      </Routes>
      {location.pathname === "/" ||
      location.pathname.includes("/detail") ||
      location.pathname === "/catalogo" ||
      location.pathname === "/detail/:id" ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default App;
