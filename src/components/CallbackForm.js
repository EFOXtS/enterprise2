import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CallbackForm.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function CallbackForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/callbacks`, form)
      .then(() => setSubmitted(true))
      .catch(err => console.error('Error submitting callback', err));
  };

  return (
    <div className="callback-form">
      <h2>Request a Callback</h2>
      {submitted ? (
        <p>Thank you! We will contact you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default CallbackForm;
