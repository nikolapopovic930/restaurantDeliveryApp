import React, { FormEvent, useState } from 'react';
import './Login.css';

const Login = () => {

  const [user, setUser] = useState(null);
  const [username , setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
      username: "",
      password: ""
    });

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
      const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: form.username, 
          password: form.password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();


      const userResponse = await fetch(`http://localhost:3000/api/v1/users/${data.userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
          'Authorization': `Bearer ${data.token}` }
      });

      if (!userResponse.ok) {
        throw new Error('Fetching user failed');
      }
      const userdata = await userResponse.json();
      setUser(userdata);

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Prijava</h2>
        <div className="form-group">
          <label htmlFor="email">Korisničko ime</label>
          <input type="text" id="username" value={form.username} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Lozinka</label>
          <input type="password" id="password" value={form.password} onChange={handleChange}/>
        </div>
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default Login;

