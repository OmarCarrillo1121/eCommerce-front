import { Routes, Route } from "react-router-dom";
import Landing  from "./Views/Landing/Landing";
import FormAdmin from "./Views/FormAdmin/FormAdmin";
import NavBar from "./components/NavBar/navbar/NavBar";
import './App.css';

function App() {

  return (
    <div className="app">
      <NavBar/>
      <Routes>
        <Route path= "/" element={<Landing/>} />
        <Route path = "/home/admin" element = {<FormAdmin/>}/>
      </Routes>
    </div>
  );
}

export default App;
