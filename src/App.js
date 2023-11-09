import { Routes, Route, useLocation } from "react-router-dom";
import Landing  from "./Views/Landing/Landing";
import FormAdmin from "./Views/FormAdmin/FormAdmin";
import NavBar from "./components/NavBar/navbar/NavBar";
import Login from "./Views/Login/login";
import Footer from "./Views/footer/footer";
import Section from "./Views/section/section";
import './App.css';

function App() {
  const location = useLocation()
  return (
    <div className="app">
      {location.pathname !== '/login' && <NavBar/>}
      <Routes>
        <Route path= "/" element={[<Landing/>, <Section/>, <Footer/>]} />
        <Route path = "/home/admin" element = {<FormAdmin/>}/>
        <Route path = "/login" element = {<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
