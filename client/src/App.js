import Header from "./Components/Header";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { useState } from "react";


function App() {

 

  return (
    <BrowserRouter>
   {/*<Header/> */} 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
