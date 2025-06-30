import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/PriceEstimator.css';

// Fallback prices (static) in case backend fails
const fallbackPrices = {
  Residential: {
    "1BHK": 5000,
    "2BHK": 7000,
    "3BHK": 9000
  },
  Commercial: {
    "Small Office": 8000,
    "Large Office": 15000
  }
};

function PriceEstimator() {
  const [serviceType, setServiceType] = useState('Residential');
  const [size, setSize] = useState('');
  const [priceData, setPriceData] = useState({});
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/prices')
      .then(res => {
        setPriceData(res.data);
        setLoading(false);

        // Default selections
        const firstType = Object.keys(res.data)[0];
        setServiceType(firstType);
        setSize(Object.keys(res.data[firstType])[0]);
      })
      .catch(err => {
        console.error('Error fetching prices from backend, using fallback.', err);
        setPriceData(fallbackPrices);
        setLoading(false);

        const firstType = Object.keys(fallbackPrices)[0];
        setServiceType(firstType);
        setSize(Object.keys(fallbackPrices[firstType])[0]);
      });
  }, []);

  const calculatePrice = () => {
    if (priceData[serviceType] && priceData[serviceType][size]) {
      setEstimatedPrice(priceData[serviceType][size]);
    } else {
      setEstimatedPrice('Price not available');
    }
  };

  if (loading) return <div className="price-estimator"><p>Loading prices...</p></div>;

  return (
    <div className="price-estimator">
      <h2>Instant Price Estimator</h2>
      <select value={serviceType} onChange={e => {
        setServiceType(e.target.value);
        setSize(Object.keys(priceData[e.target.value])[0]);
      }}>
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
