import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";          // postojeći stilovi

const Order: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);   // modal state
  const [form, setForm] = useState({
    address: "",
    city: "",
    country: "",
    phone: "",
    note: "",
  });
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/orders/placeOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deliveryInfo: {
              address: form.address,
              city: form.city,
              country: form.country,
              phoneNumber: form.phone,
              note: form.note,
            },
          }),
        }
      );

      if (!res.ok) {
        setIsOpen(true);
        setModalMessage ('Greska prilikom slanja narudžbine');
        setModalTitle ('Izvinjavamo se!');
        return;
      }

      setIsOpen(true);
      setModalMessage ('Vaša narudžbina je uspešno poslata!');
      setModalTitle ('Hvala!');

    } catch (err) {
      console.error(err);
      setIsOpen(true);
      setModalMessage ('Greska prilikom slanja narudžbine');
      setModalTitle ('Izvinjavamo se!');
      return;
    }
  };

  const handleOk = () => {
    setIsOpen(false);                           
    navigate("/");                              
  };

  return (
    <>
      <div className="order-container">
        <form className="order-form" onSubmit={handleSubmit}>
          <h2>Porudžbina</h2>

          <div className="order-group">
            <label htmlFor="address">Adresa</label>
            <input
              type="text"
              id="address"
              required
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="order-group">
            <label htmlFor="city">Grad</label>
            <input
              type="text"
              id="city"
              required
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="order-group">
            <label htmlFor="country">Država</label>
            <input
              type="text"
              id="country"
              required
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className="order-group">
            <label htmlFor="phone">Broj telefona</label>
            <input
              type="tel"
              id="phone"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="order-group">
            <label htmlFor="note">Dodatne informacije</label>
            <textarea
              id="note"
              rows={3}
              value={form.note}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="order-button">
            Naruči
          </button>
        </form>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{modalTitle}</h3>
            <p>{modalMessage}</p>
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