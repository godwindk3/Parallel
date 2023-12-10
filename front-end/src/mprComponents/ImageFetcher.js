import './ImageFetcher.css';

import React, { useState, useEffect } from 'react';

const ImageFetcher = ({ dataChanged }) => {
  const [middleValue, setMiddleValue] = useState(null);
  const [xCoordinate, setXCoordinate] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [maxValue, setMaxValue] = useState(null);

  useEffect(() => {
    // Fetch size values from the API
    fetchSizeValues();
  }, []); // Fetch only once when the component mounts

  useEffect(() => {
    // Fetch image when xCoordinate or dataChanged changes
    fetchImage(xCoordinate);
  }, [xCoordinate, dataChanged]);

  const fetchSizeValues = async () => {
    try {
      const response = await fetch('/size');
      if (response.ok) {
        const data = await response.json();
        const initialMiddleValue = Math.floor(data.x / 2); // Set initial middleValue as the floor of x / 2
        setMiddleValue(initialMiddleValue);
        setXCoordinate(initialMiddleValue); // Set xCoordinate to the initial middleValue
        setMaxValue(data.x); // Set max value to the 'x' coordinate
      } else {
        console.error('Failed to fetch size values:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchImage = async (coordinate) => {
    try {
      const response = await fetch(`/coronal/${coordinate}`);
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } else {
        console.error('Failed to fetch image:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRangeChange = (e) => {
    const newCoordinate = parseInt(e.target.value, 10);
    setXCoordinate(newCoordinate);
  };

  return (
    <div className="fet-container">
      <div className="fet-input-container">
        <label className='info-colour'>
          <p>Adjust Coronal (0-{maxValue !== null ? maxValue : ''}):</p>
          <input
            type="range"
            min="0"
            max={maxValue !== null ? maxValue : ''}
            value={xCoordinate !== null ? xCoordinate : ''}
            onChange={handleRangeChange}
            step="1"
          />
          {xCoordinate !== null ? xCoordinate : ''}
        </label>
      </div>

      <div
        className="scroll-container"
        style={{ overflowX: 'auto', width: '140%', maxWidth: '400px', maxHeight: '80%', whiteSpace: 'nowrap' }}
      >
        {imageSrc && <img src={imageSrc} alt="Coronal Image" className="square-image" />}
      </div>
    </div>
  );
};

export default ImageFetcher;
