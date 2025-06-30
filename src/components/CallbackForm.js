import React, { useState } from 'react';
import api from '../api/api';
import '../styles/CallbackForm.css';

function CallbackForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await api.post('/api/callback', { name, phone });
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError('Error submitting request');
    }
  };

  return (
    <div className="callback-form">
      <h2>Request a Callback</h2>
      {submitted ? (
        <p>Thank you! We'll call you back shortly.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
          />
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CallbackForm;
