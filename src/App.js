
import { Routes, Route, useLocation } from "react-router-dom";
import Landing  from "./Views/Landing/Landing";
import FormAdmin from "./Views/FormAdmin/FormAdmin";
import NavBar from "./components/NavBar/NavBar";
import RegistroUser from "./Views/RegistroUser/RegistroUser"
import Store from "./Views/Store/Store";

import './App.css';
import Contact from "./components/Contact/Contact";

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {
        location.pathname !== "/" && <NavBar/>
      }

      <Routes>
        
        <Route path = "/" element={<Landing/>} />
        <Route path="/tienda" element ={ <Store />} />
        <Route path = "/admin" element = { <FormAdmin/>} />
        <Route path = "/registro" element = { <RegistroUser /> } />
        <Route path="/contactos" element = { <Contact />} />


      </Routes>

      
    </div>
  );
}

export default App;
