import React, { useState } from 'react';
import '../styles/App.css';

const CallbackForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Callback request submitted:', form);
  };

  return (
    <section className="callback-form">
      <h2>Request a Callback</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input type="tel" placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
        <textarea placeholder="Message" onChange={e => setForm({...form, message: e.target.value})}></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default CallbackForm;

