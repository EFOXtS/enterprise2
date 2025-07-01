import React, { useState } from 'react';
import api from '../api/api';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [tax, setTax] = useState(18);
  const [billAmount, setBillAmount] = useState('');

  const [priceFile, setPriceFile] = useState(null);
  const [reviewImage, setReviewImage] = useState(null);
  const [sliderImage, setSliderImage] = useState(null);

  const calculateBill = () => {
    const base = parseFloat(billAmount || 0);
    const gst = base * (tax / 100);
    alert(`Total with GST: ₹${base + gst}`);
  };

  const uploadFile = (endpoint, file) => {
    if (!file) return alert("No file selected!");
    const formData = new FormData();
    formData.append('file', file);

    api.post(endpoint, formData)
      .then(() => alert('Upload successful!'))
      .catch(() => alert('Upload failed!'));
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
        <input type="file" accept="application/json" onChange={e => setPriceFile(e.target.files[0])} />
        <button onClick={() => uploadFile('/api/upload-prices', priceFile)}>Upload Price File</button>
        <p>Use JSON format for prices.</p>
      </section>

      <section>
        <h3>Upload Review Background Image</h3>
        <input type="file" accept="image/*" onChange={e => setReviewImage(e.target.files[0])} />
        <button onClick={() => uploadFile('/api/review-images', reviewImage)}>Upload Review BG Image</button>
      </section>

      <section>
        <h3>Upload Slider Image</h3>
        <input type="file" accept="image/*" onChange={e => setSliderImage(e.target.files[0])} />
        <button onClick={() => uploadFile('/api/slider-images', sliderImage)}>Upload Slider Image</button>
      </section>
    </div>
  );
};

export default AdminPage;
