import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import './Application.css';
import Navbar from '../Navbar/navbar';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AboutUs from '../AboutUs/AboutUs';
import Footer from '../Footer/Footer';

function Application() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  
  );
}

export default Application;
