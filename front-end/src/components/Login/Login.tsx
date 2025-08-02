import React, { FormEvent, useState } from 'react';
import './Login.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useUser();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    password: '',
  });
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: '' })); // Resetuje grešku prilikom unosa
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    setFieldErrors({ username: '', password: '' });

    let hasError = false;

    if (!form.username.trim()) {
      setFieldErrors((prev) => ({ ...prev, username: 'Morate uneti korisničko ime' }));
      hasError = true;
    }

    if (!form.password.trim()) {
      setFieldErrors((prev) => ({ ...prev, password: 'Morate uneti lozinku' }));
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      const userResponse = await fetch(
        `http://localhost:3000/api/v1/users/${data.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error('Fetching user failed');
      }

      const userdata = await userResponse.json();
      userdata.data.data.token = data.token;
      setUser(userdata.data.data);
      setSuccess(true);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Prijava</h2>

        <div className="form-group">
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

        <div className="form-group">
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

        <button type="submit">Prijavi se</button>

        {error && <p className="error-msg">Pogrešno korisničko ime ili lozinka.</p>}

      </form>
    </div>
  );
};

export default Login;


