import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ImageSlider.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function ImageSlider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/images`)
      .then(res => setImages(res.data))
      .catch(err => console.error('Error fetching images', err));
  }, []);

  return (
    <div className="image-slider">
      {images.map((img, idx) => (
        <img key={idx} src={img.url} alt={img.alt || `Slide ${idx + 1}`} />
      ))}
    </div>
  );
}

export default ImageSlider;
