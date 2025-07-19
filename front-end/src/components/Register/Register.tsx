import React, { FormEvent, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    birthdate: '',
    address: '',
    city: '',
    country: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    try {
      const res = await fetch('http://localhost:3000/api/v1/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
          password: form.password,
          birthDate: form.birthdate,
          address: form.address,
          city: form.city,
          country: form.country,
          email: form.email,
          phoneNumber: form.phone,
        }),
      });

      if (!res.ok) throw new Error('Registration failed');

      setSuccess(true);
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="reg-container">
      <form className="reg-form" onSubmit={handleSubmit}>
        <h2>Registracija</h2>

        <div className="reg-group">
          <label htmlFor="firstName">Ime</label>
          <input
            type="text"
            id="firstName"
            required
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="lastName">Prezime</label>
          <input
            type="text"
            id="lastName"
            required
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="username">Korisničko ime</label>
          <input
            type="text"
            id="username"
            required
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="password">Lozinka</label>
          <input
            type="password"
            id="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="birthdate">Datum rođenja</label>
          <input
            type="date"
            id="birthdate"
            required
            value={form.birthdate}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="address">Adresa</label>
          <input
            type="text"
            id="address"
            required
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="city">Grad</label>
          <input
            type="text"
            id="city"
            required
            value={form.city}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="country">Država</label>
          <input
            type="text"
            id="country"
            required
            value={form.country}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label htmlFor="phone">Broj telefona</label>
          <input
            type="tel"
            id="phone"
            required
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="reg-button">Registruj se</button>
        {success && <p style={{ color: 'green' }}>Registracija uspešna!</p>}
        {error && <p style={{ color: 'red' }}>Došlo je do greške. Pokušajte ponovo.</p>}
      </form>
    </div>
  );
};

export default Register;
