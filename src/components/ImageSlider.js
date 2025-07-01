import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/ImageSlider.css';

// Fallback images (static)
const fallbackImages = [
  '/images/fallback1.jpg',
  '/images/fallback2.jpg',
  '/images/fallback3.jpg'
];

function ImageSlider() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/images')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setImages(res.data);
        } else {
          setImages(fallbackImages);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching images from backend, using fallback.', err);
        setImages(fallbackImages);
        setLoading(false);
      });
  }, []);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

  if (loading) return <div className="image-slider"><p>Loading images...</p></div>;

  return (
    <div className="image-slider">
      <button onClick={prevSlide}>&#10094;</button>
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        onError={(e) => e.target.src = fallbackImages[0]}  // Fallback on per-image failure
        className="slider-image"
      />
      <button onClick={nextSlide}>&#10095;</button>
    </div>
  );
}

export default ImageSlider;
