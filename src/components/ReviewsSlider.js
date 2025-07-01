import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/ReviewsSlider.css';

// Fallback images
const fallbackBackgrounds = [
  '/images/review-bg1.jpg',
  '/images/review-bg2.jpg',
  '/images/review-bg3.jpg'
];

// Fallback reviews
const fallbackReviews = [
  { author: "Rahul", text: "Excellent service!" },
  { author: "Priya", text: "Safe and reliable shifting." },
  { author: "Amit", text: "Affordable and professional." }
];

function ReviewsSlider() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/api/review-images').catch(() => ({ data: fallbackBackgrounds })),
      api.get('/api/reviews').catch(() => ({ data: fallbackReviews }))
    ])
      .then(([bgRes, revRes]) => {
        setBackgrounds(bgRes.data.length ? bgRes.data : fallbackBackgrounds);
        setReviews(revRes.data.length ? revRes.data : fallbackReviews);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds]);

  if (loading) return <div className="reviews-slider"><p>Loading reviews...</p></div>;

  return (
    <div
      className="reviews-slider"
      style={{ backgroundImage: `url(${backgrounds[current]})` }}
    >
      <div className="reviews-container">
        {reviews.map((rev, idx) => (
          <div key={idx} className="review-tile">
            <p>"{rev.text}"</p>
            <h4>- {rev.author}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSlider;
