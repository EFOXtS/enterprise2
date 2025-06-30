import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PriceEstimator.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function PriceEstimator() {
  const [serviceType, setServiceType] = useState('Residential');
  const [size, setSize] = useState('1BHK');
  const [priceData, setPriceData] = useState({});
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/prices`)
      .then(res => setPriceData(res.data))
      .catch(err => console.error('Error fetching prices', err));
  }, []);

  const calculatePrice = () => {
    if (priceData[serviceType] && priceData[serviceType][size]) {
      setEstimatedPrice(priceData[serviceType][size]);
    } else {
      setEstimatedPrice('Price not available');
    }
  };

  return (
    <div className="price-estimator">
      <h2>Instant Price Estimator</h2>
      <select value={serviceType} onChange={e => setServiceType(e.target.value)}>
        {Object.keys(priceData).map(type => <option key={type}>{type}</option>)}
      </select>
      <select value={size} onChange={e => setSize(e.target.value)}>
        {priceData[serviceType] && Object.keys(priceData[serviceType]).map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <button onClick={calculatePrice}>Calculate Price</button>
      {estimatedPrice && <p>Estimated Price: ₹{estimatedPrice}</p>}
    </div>
  );
}

export default PriceEstimator;
