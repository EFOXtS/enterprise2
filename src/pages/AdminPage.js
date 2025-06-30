import React, { useState } from 'react';
import '../styles/App.css';

const AdminPage = () => {
  const [prices, setPrices] = useState({
    Residential: { '1BHK': 5000, '2BHK': 8000 },
    Office: { Small: 10000, Large: 20000 },
    Goods: { Small: 3000, Large: 6000 }
  });

  const [tax, setTax] = useState(18);
  const [billAmount, setBillAmount] = useState('');

  const calculateBill = () => {
    const base = parseFloat(billAmount || 0);
    const gst = base * (tax / 100);
    alert(`Total with GST: ₹${base + gst}`);
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      <section>
        <h3>Billing System</h3>
        <input type="number" placeholder="Enter Amount" onChange={e => setBillAmount(e.target.value)} />
        <input type="number" value={tax} onChange={e => setTax(e.target.value)} />
        <button onClick={calculateBill}>Calculate Bill</button>
      </section>
      <section>
        <h3>Manage Prices</h3>
        <pre>{JSON.stringify(prices, null, 2)}</pre>
      </section>
      <section>
        <h3>Manage Images</h3>
        <p>Upload/Delete images for sliders here (future backend integration).</p>
      </section>
    </div>
  );
};

export default AdminPage;

