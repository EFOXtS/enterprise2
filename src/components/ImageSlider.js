import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/ImageSlider.css';

// Fallback static images (must be in /public/images/)
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

  // Autoplay next image every 5s
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  if (loading) return <div className="image-slider"><p>Loading images...</p></div>;

  return (
    <div className="image-slider">
      <button onClick={() => setCurrent((current - 1 + images.length) % images.length)}>&#10094;</button>
      <div className="slider-image-container">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          loading="lazy"
          onError={(e) => {
            console.error('Image failed to load, using fallback');
            e.target.src = fallbackImages[0];
          }}
        />
      </div>
      <button onClick={() => setCurrent((current + 1) % images.length)}>&#10095;</button>
    </div>
  );
}

export default ImageSlider;
