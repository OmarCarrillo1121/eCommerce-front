
import { Routes, Route } from "react-router-dom";

import Home from "./Views/Home/Home";
import Landing  from "./Views/Landing/Landing";
import FormAdmin from "./Views/FormAdmin/FormAdmin";


import './App.css';

function App() {

  return (
    <div className="App">

      <Routes>
        
        <Route path= "/" element={<Landing/>} />
        <Route path= "/home" element={<Home/>} />
        <Route path = "/home/admin" element = { <FormAdmin/>} />


      </Routes>

      
    </div>
  );
}

export default App;
