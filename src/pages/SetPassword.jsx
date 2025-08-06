import React, { useState } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function SetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', password_confirmation: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/set-password', { ...form, token });
      setMsg('Password set successfully');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Set Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input name="password" type="password" placeholder="New Password" onChange={handleChange} required />
        <input name="password_confirmation" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Set Password</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
