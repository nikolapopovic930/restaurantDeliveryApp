import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";          // postojeći stilovi

const Order: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);   // modal state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);                             // prikaži modal
  };

  const handleOk = () => {
    setIsOpen(false);                            // zatvori modal
    navigate("/");                               // idi na Home
  };

  return (
    <>
      <div className="order-container">
        <form className="order-form" onSubmit={handleSubmit}>
          <h2>Porudžbina</h2>

          <div className="order-group">
            <label htmlFor="address">Adresa</label>
            <input type="text" id="address" required />
          </div>

          <div className="order-group">
            <label htmlFor="city">Grad</label>
            <input type="text" id="city" required />
          </div>

          <div className="order-group">
            <label htmlFor="country">Država</label>
            <input type="text" id="country" required />
          </div>

          <div className="order-group">
            <label htmlFor="phone">Broj telefona</label>
            <input type="tel" id="phone" required />
          </div>

          <div className="order-group">
            <label htmlFor="note">Dodatne informacije</label>
            <textarea id="note" rows={3}></textarea>
          </div>

          <button type="submit" className="order-button">
            Naruči
          </button>
        </form>
      </div>

      {/* ---------- MODAL ---------- */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Hvala!</h3>
            <p>Vaša narudžbina je uspešno primljena.</p>
            <button onClick={handleOk} className="modal-btn">
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;