import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/products');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  // ✅ Temporary bypass for demo only
  const handleBypass = () => {
    localStorage.setItem('token', 'demo-bypass-token'); // Set fake token
    navigate('/products');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>

      <p>{msg}</p>

      {/* ✅ Temporary Bypass Button for demo */}
      <button
        type="button"
        onClick={handleBypass}
        style={{ marginTop: '10px', backgroundColor: '#ccc', padding: '8px' }}
      >
        Bypass Login (Temporary Access)
      </button>
    </div>
  );
}
