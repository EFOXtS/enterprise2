import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ReviewsSlider.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function ReviewsSlider() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/reviews`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('Error fetching reviews', err));
  }, []);

  return (
    <div className="reviews-slider">
      <h2>Customer Reviews</h2>
      <div className="reviews-container">
        {reviews.map((review, idx) => (
          <div key={idx} className="review-tile">
            <p>"{review.comment}" - {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSlider;
