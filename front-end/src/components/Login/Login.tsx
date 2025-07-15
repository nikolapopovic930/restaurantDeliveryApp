import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Prijava</h2>
        <div className="form-group">
          <label htmlFor="email">Email adresa</label>
          <input type="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lozinka</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default Login;

