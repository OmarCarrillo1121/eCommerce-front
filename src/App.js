import { Routes, Route, useLocation } from "react-router-dom";
import Landing  from "./Views/Landing/Landing";
import NavBar from "./components/NavBar/navbar/NavBar";
import Login from "./Views/Login/login";
import Footer from "./Views/footer/footer";
import Section from "./Views/section/section";
import Detail from "./Views/Detail/Detail";
import './App.css';

function App() {
  const location = useLocation()
  return (
    <div className="app">
      {location.pathname !== '/login' && <NavBar/>}
      <Routes>
        <Route path= "/" element={[
        <Landing key={1}/>, 
        <Section key={2}/>, 
        <Footer key={3}/>]} />
        <Route path = "/login" element = {<Login/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/formVideogame" element={<FormVideogame/>}/>
      </Routes>
    </div>
  );
}

export default App;
