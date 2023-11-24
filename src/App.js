import { Routes, Route, useLocation } from "react-router-dom";
import { useWindow } from "./util/hook/window/useWindow";
import Landing  from "./Views/Landing/Landing";
import NavBar from "./components/NavBar/navbar/NavBar";
import Login from "./Views/Login/login";
import Footer from "./Views/footer/footer";
import Section from "./Views/section/section";
import Detail from "./Views/Detail/Detail";
import FormVideogame from "./components/Formulary/FormVideogame/FormVideogame";
import EditVideogame from "./components/Formulary/FormVideogame/EditVideogame";
import Catalogo from "./components/Catalogo/Catalogo";
import ResponsiveNav from "./components/NavBar/responsiveNav/resposiveNav";
import Account from "./Views/Dashboard/account";

//⭐
import Orders from "./Views/Dashboard/accountNav/links/ordersDash/ordersDash";
import DetailOrders from "./Views/Dashboard/accountNav/links/dashboard/DetailOrders/DetailOrdes";
import CancelledOrders from"./Views/Dashboard/accountNav/links/CancelledOrders/CancelledOrders";
import ActiveOrders from"./Views/Dashboard//accountNav/links/ActiveOrders/ActiveOrders";

import './App.css';

function App() {
  const location = useLocation()
  const { viewportWidth } = useWindow();
  return (
    <div className="app">
      {(location.pathname === '/' ||
      location.pathname.includes('/detail') || 
      location.pathname === '/catalogo' || 
      location.pathname === '/detail/:id') &&
      viewportWidth >= 800 ?
      <NavBar/> : null}
      {viewportWidth <= 800 && <ResponsiveNav/>}
      <Routes>
        <Route path= "/" element={[
          <Landing key={1}/>, 
          <Section key={2}/>]} />
        <Route path = "/login" element = {<Login/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/formVideogame" element={<FormVideogame/>}/>
        <Route path="/editVideogame/:id" element={<EditVideogame/>}/>
        <Route path="/catalogo" element={<Catalogo/>}/>
        <Route path="/dashboard/:id" element={<Account/>}/>
        <Route path="/dashboard/Orders" element={<Orders/>}/> 
        <Route path="/dashboard/Orders/:id" element={<DetailOrders/>}/> 
        <Route path="/dashboard/Orders/cancel" element={<CancelledOrders/>}/>
        <Route path="/dashboard/Orders/active" element={<ActiveOrders/>}/>
       
      </Routes>
      {location.pathname === '/' ||
      location.pathname.includes('/detail') || 
      location.pathname === '/catalogo' || 
      location.pathname === '/detail/:id' ?
      <Footer/> : null}
    </div>
  );
}

export default App;
