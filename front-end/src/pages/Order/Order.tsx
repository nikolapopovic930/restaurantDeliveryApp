import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import { useUser } from "../../components/context/UserContext";
import Modal from "../../components/Modal/Modal";


const Order: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    address: "",
    city: "",
    country: "",
    phone: "",
    note: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const { user } = useUser();

  const fieldNames: { [key: string]: string } = {
    address: "adresu",
    city: "grad",
    country: "državu",
    phone: "broj telefona",
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setForm((form) => ({ ...form, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: { [key: string]: string } = {};

    Object.entries(form).forEach(([key, value]) => {
      if (key !== "note" && !value.trim()) {
        const label = fieldNames[key] || "polje";
        newErrors[key] = `Morate uneti ${label}`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/orders/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          deliveryInfo: {
            address: form.address,
            city: form.city,
            country: form.country,
            phoneNumber: form.phone,
            note: form.note,
          },
        }),
      });

      if (!res.ok) {
        setIsOpen(true);
        setModalTitle("Izvinjavamo se!");
        setModalMessage("Greška prilikom slanja narudžbine");
        return;
      }

      setIsOpen(true);
      setModalTitle("Hvala!");
      setModalMessage("Vaša narudžbina je uspešno poslata!");
    } catch (err) {
      console.error(err);
      setIsOpen(true);
      setModalTitle("Izvinjavamo se!");
      setModalMessage("Greška prilikom slanja narudžbine");
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
              value={form.address}
              onChange={handleChange}
              className={fieldErrors.address ? "input-error" : ""}
            />
            {fieldErrors.address && <p className="error-msg">{fieldErrors.address}</p>}
          </div>

          <div className="order-group">
            <label htmlFor="city">Grad</label>
            <input
              type="text"
              id="city"
              value={form.city}
              onChange={handleChange}
              className={fieldErrors.city ? "input-error" : ""}
            />
            {fieldErrors.city && <p className="error-msg">{fieldErrors.city}</p>}
          </div>

          <div className="order-group">
            <label htmlFor="country">Država</label>
            <input
              type="text"
              id="country"
              value={form.country}
              onChange={handleChange}
              className={fieldErrors.country ? "input-error" : ""}
            />
            {fieldErrors.country && <p className="error-msg">{fieldErrors.country}</p>}
          </div>

          <div className="order-group">
            <label htmlFor="phone">Broj telefona</label>
            <input
              type="tel"
              id="phone"
              value={form.phone}
              onChange={handleChange}
              className={fieldErrors.phone ? "input-error" : ""}
            />
            {fieldErrors.phone && <p className="error-msg">{fieldErrors.phone}</p>}
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

          <button type="submit" className="order-button">Naruči</button>
        </form>
      </div>
      <Modal
        isOpen={isOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={handleOk}
      />
    </>
  );
};

export default Order;
