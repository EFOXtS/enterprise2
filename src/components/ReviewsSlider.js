import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/ReviewsSlider.css';

function ReviewsSlider() {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get('/api/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Error fetching reviews', err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews]);

  if (!reviews.length) return <div className="reviews-slider">Loading reviews...</div>;

  return (
    <div className="reviews-slider">
      {reviews.map((review, index) => (
        <div
          key={index}
          className={`review-tile ${index === current ? 'active' : ''}`}
          style={{ display: index === current ? 'block' : 'none' }}
        >
          <p>"{review.text}"</p>
          <h4>- {review.author}</h4>
        </div>
      ))}
    </div>
  );
}

export default ReviewsSlider;
