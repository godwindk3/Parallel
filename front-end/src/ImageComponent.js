import React, { useState, useEffect } from 'react';
import './ImageComponent.css'; // Import the CSS file

const ImageComponent = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('/image');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="image-container"> {/* Apply the CSS class */}
      {imageSrc && <img src={imageSrc} alt="FastAPI Image" />} {/* Display the image */}
    </div>
  );
};

export default ImageComponent;


