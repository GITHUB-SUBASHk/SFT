import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: '', otp: '', password: '', password_confirmation: ''
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/reset-password', form);
      setMsg('Password reset successful');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="otp" placeholder="OTP" onChange={handleChange} required />
        <input name="password" type="password" placeholder="New Password" onChange={handleChange} required />
        <input name="password_confirmation" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Reset</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
