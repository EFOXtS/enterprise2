import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/ImageSlider.css';

function ImageSlider() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get('/api/images')
      .then(res => setImages(res.data))
      .catch(err => console.error('Error fetching images', err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images.length) return <div className="image-slider">Loading images...</div>;

  return (
    <div className="image-slider">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.url}
          alt={`Slide ${index}`}
          className={`slider-image ${index === current ? 'active' : ''}`}
          style={{
            display: index === current ? 'block' : 'none',
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
      ))}
    </div>
  );
}

export default ImageSlider;
