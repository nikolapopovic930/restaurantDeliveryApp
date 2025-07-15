import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="reg-container">
      <form className="reg-form">
        <h2>Registracija</h2>

        <div className="reg-group">
          <label htmlFor="firstName">Ime</label>
          <input type="text" id="firstName" />
        </div>

        <div className="reg-group">
          <label htmlFor="lastName">Prezime</label>
          <input type="text" id="lastName" />
        </div>

        <div className="reg-group">
          <label htmlFor="username">Korisničko ime</label>
          <input type="text" id="username" />
        </div>

        <div className="reg-group">
          <label htmlFor="password">Lozinka</label>
          <input type="password" id="password" />
        </div>

        <div className="reg-group">
          <label htmlFor="birthdate">Datum rođenja</label>
          <input type="date" id="birthdate" />
        </div>

        <div className="reg-group">
          <label htmlFor="address">Adresa</label>
          <input type="text" id="address" />
        </div>

        <div className="reg-group">
          <label htmlFor="city">Grad</label>
          <input type="text" id="city" />
        </div>

        <div className="reg-group">
          <label htmlFor="country">Država</label>
          <input type="text" id="country" />
        </div>

        <div className="reg-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <div className="reg-group">
          <label htmlFor="phone">Broj telefona</label>
          <input type="tel" id="phone" />
        </div>

        <button type="submit" className="reg-button">Registruj se</button>
      </form>
    </div>
  );
};

export default Register;

