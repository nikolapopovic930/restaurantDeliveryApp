import React, { FormEvent, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

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

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalTitle = 'Uspešno ste se registrovali';
  const modalMessage = '';

  const fieldNames: { [key: string]: string } = {
    firstName: 'ime',
    lastName: 'prezime',
    username: 'korisničko ime',
    password: 'lozinku',
    birthdate: 'datum rođenja',
    address: 'adresu',
    city: 'grad',
    country: 'državu',
    email: 'email',
    phone: 'broj telefona',
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setForm((form) => ({ ...form, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(false);

    const newErrors: { [key: string]: string } = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        const fieldLabel = fieldNames[key] || 'polje';
        newErrors[key] = `Morate uneti ${fieldLabel}`;
      }
    });

    const nameRegex = /^[A-Za-zŠšĐđČčĆćŽž\s\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{8,}$/;
    const uppercaseRegex = /[A-ZČĆŠĐŽ]/;

    if (form.firstName && !nameRegex.test(form.firstName)) {
      newErrors.firstName = 'Ime može sadržati samo slova';
    }

    if (form.lastName && !nameRegex.test(form.lastName)) {
      newErrors.lastName = 'Prezime može sadržati samo slova';
    }

    if (form.password) {
      if (form.password.length < 6) {
        newErrors.password = 'Lozinka mora imati najmanje 6 karaktera';
      } else if (!uppercaseRegex.test(form.password)) {
        newErrors.password = 'Lozinka mora sadržati bar jedno veliko slovo';
      }
    }

    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = 'Email nije u ispravnom formatu';
    }

    if (form.phone && !phoneRegex.test(form.phone)) {
      newErrors.phone = 'Unesite ispravan broj telefona (min. 8 cifara)';
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

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
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    navigate('/login');
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
            value={form.firstName}
            onChange={handleChange}
            className={fieldErrors.firstName ? 'input-error' : ''}
          />
          {fieldErrors.firstName && <p className="error-msg">{fieldErrors.firstName}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="lastName">Prezime</label>
          <input
            type="text"
            id="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={fieldErrors.lastName ? 'input-error' : ''}
          />
          {fieldErrors.lastName && <p className="error-msg">{fieldErrors.lastName}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="username">Korisničko ime</label>
          <input
            type="text"
            id="username"
            value={form.username}
            onChange={handleChange}
            className={fieldErrors.username ? 'input-error' : ''}
          />
          {fieldErrors.username && <p className="error-msg">{fieldErrors.username}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="password">Lozinka</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className={fieldErrors.password ? 'input-error' : ''}
          />
          {fieldErrors.password && <p className="error-msg">{fieldErrors.password}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="birthdate">Datum rođenja</label>
          <input
            type="date"
            id="birthdate"
            value={form.birthdate}
            onChange={handleChange}
            className={fieldErrors.birthdate ? 'input-error' : ''}
          />
          {fieldErrors.birthdate && <p className="error-msg">{fieldErrors.birthdate}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="address">Adresa</label>
          <input
            type="text"
            id="address"
            value={form.address}
            onChange={handleChange}
            className={fieldErrors.address ? 'input-error' : ''}
          />
          {fieldErrors.address && <p className="error-msg">{fieldErrors.address}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="city">Grad</label>
          <input
            type="text"
            id="city"
            value={form.city}
            onChange={handleChange}
            className={fieldErrors.city ? 'input-error' : ''}
          />
          {fieldErrors.city && <p className="error-msg">{fieldErrors.city}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="country">Država</label>
          <input
            type="text"
            id="country"
            value={form.country}
            onChange={handleChange}
            className={fieldErrors.country ? 'input-error' : ''}
          />
          {fieldErrors.country && <p className="error-msg">{fieldErrors.country}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className={fieldErrors.email ? 'input-error' : ''}
          />
          {fieldErrors.email && <p className="error-msg">{fieldErrors.email}</p>}
        </div>

        <div className="reg-group">
          <label htmlFor="phone">Broj telefona</label>
          <input
            type="tel"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            className={fieldErrors.phone ? 'input-error' : ''}
          />
          {fieldErrors.phone && <p className="error-msg">{fieldErrors.phone}</p>}
        </div>

        <button type="submit" className="reg-button">Registruj se</button>
        {error && <p style={{ color: 'red' }}>Došlo je do greške. Pokušajte ponovo.</p>}
      </form>

      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={handleClose}
      />
    </div>
  );
};

export default Register;


