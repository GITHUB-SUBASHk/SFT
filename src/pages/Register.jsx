import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    dob: '',
    languages: [],
    country: '',
    state: '',
    city: ''
  });

  const [msg, setMsg] = useState('');

  const languagesList = ['English', 'Hindi', 'Tamil', 'Telugu'];

  const handleChange = (e) => {
    const { name, value, type, multiple, options } = e.target;

    if (multiple) {
      const selected = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setForm(prev => ({ ...prev, [name]: selected }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/register', form);
      setMsg('Check your email to set your password.');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          required
        />

        <select
          name="languages"
          multiple
          onChange={handleChange}
          required
        >
          {languagesList.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <select name="country" onChange={handleChange} required>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>

        <select name="state" onChange={handleChange} required>
          <option value="">Select State</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="California">California</option>
        </select>

        <select name="city" onChange={handleChange} required>
          <option value="">Select City</option>
          <option value="Chennai">Chennai</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>

        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
