import React, { FormEvent, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { login, getUser } from '../../services/userService';

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setForm((form) => ({ ...form, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
      const data = await login({
        username: form.username,
        password: form.password,
      });

      const userdata = await getUser(data.userId, data.token);
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


