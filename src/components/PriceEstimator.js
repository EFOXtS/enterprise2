import React, { useState } from 'react';
import '../styles/App.css';

const PriceEstimator = () => {
  const [service, setService] = useState('Residential');
  const [size, setSize] = useState('1BHK');
  const [price, setPrice] = useState(0);

  const priceMap = {
    Residential: { '1BHK': 5000, '2BHK': 8000 },
    Office: { Small: 10000, Large: 20000 },
    Goods: { Small: 3000, Large: 6000 }
  };

  const calculatePrice = () => {
    setPrice(priceMap[service][size] || 0);
  };

  return (
    <section className="estimator">
      <h2>Instant Price Estimator</h2>
      <select value={service} onChange={e => setService(e.target.value)}>
        <option>Residential</option>
        <option>Office</option>
        <option>Goods</option>
      </select>
      <select value={size} onChange={e => setSize(e.target.value)}>
        {Object.keys(priceMap[service]).map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <button onClick={calculatePrice}>Calculate Price</button>
      {price > 0 && <p>Estimated Price: ₹{price}</p>}
    </section>
  );
};

export default PriceEstimator;

