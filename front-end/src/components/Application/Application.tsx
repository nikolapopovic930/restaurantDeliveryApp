import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import './Application.css';
import Navbar from '../Navbar/navbar';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AboutUs from '../AboutUs/AboutUs';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';
import Order from '../Order/Order';
import { UserProvider } from '../context/UserContext';

function Application() {
  return (
    <UserProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
      
      </Routes>
      <Footer />
    </BrowserRouter>
    </UserProvider>
  
  );
}

export default Application;
