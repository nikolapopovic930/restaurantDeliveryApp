import React from 'react';
import './Order.css';

const Order: React.FC = () => {
  return (
    <div className="order-container">
      <form className="order-form">
        <h2>Porudžbina</h2>
        <div className="order-group">
          <label htmlFor="address">Adresa</label>
          <input type="text" id="address" />
        </div>
        <div className="order-group">
          <label htmlFor="city">Grad</label>
          <input type="text" id="city" />
        </div>
        <div className="order-group">
          <label htmlFor="country">Država</label>
          <input type="text" id="country" />
        </div>
        <div className="order-group">
          <label htmlFor="phone">Broj telefona</label>
          <input type="tel" id="phone" />
        </div>
        <div className="order-group">
          <label htmlFor="note">Dodatne informacije</label>
          <textarea id="note" rows={3}></textarea>
        </div>
        <button type="submit" className="order-button">Pošalji</button>
      </form>
    </div>
  );
};

export default Order;