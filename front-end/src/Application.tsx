import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Application.css';
import AboutUs from './pages/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';
import { UserProvider } from './components/context/UserContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Order from './pages/Order/Order';
import Menu from './pages/Menu/Menu';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Navbar from './components/Navbar/Navbar';

function Application() {
  return (
    <UserProvider>
    <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/my-cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  
  );
}

export default Application;
