import React, { useState, useEffect } from 'react';

const SagittalImageFetcher = ({ dataChanged }) => {
  const [middleValue, setMiddleValue] = useState(null);
  const [yCoordinate, setYCoordinate] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [maxValue, setMaxValue] = useState(null);

  useEffect(() => {
    // Fetch size values from the API
    fetchSizeValues();
  }, []); // Fetch only once when the component mounts

  useEffect(() => {
    // Fetch image when yCoordinate or dataChanged changes
    fetchImage(yCoordinate);
  }, [yCoordinate, dataChanged]);

  const fetchSizeValues = async () => {
    try {
      const response = await fetch('/size');
      if (response.ok) {
        const data = await response.json();
        const initialMiddleValue = Math.floor(data.y / 2); // Set initial middleValue as the floor of y / 2
        setMiddleValue(initialMiddleValue);
        setYCoordinate(initialMiddleValue); // Set yCoordinate to the initial middleValue
        setMaxValue(data.y); // Set max value to the 'y' coordinate
      } else {
        console.error('Failed to fetch size values:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchImage = async (coordinate) => {
    try {
      const response = await fetch(`/sagittal/${coordinate}`);
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
    setYCoordinate(newCoordinate);
  };

  return (
    <div className="fet-container">
      <div className="sagittal-fet-input-container">
        <label className='info-colour'>
          <p>Adjust Sagittal (0-{maxValue !== null ? maxValue : ''}):</p>
          <input
            type="range"
            min="0"
            max={maxValue !== null ? maxValue : ''}
            value={yCoordinate !== null ? yCoordinate : ''}
            onChange={handleRangeChange}
            step="1"
          />
          {yCoordinate !== null ? yCoordinate : ''}
        </label>
      </div>

      <div
        className="scroll-container"
        style={{ overflowX: 'auto', width: '100%', maxWidth: '400px', maxHeight: '90%', whiteSpace: 'nowrap' }}
      >
        {imageSrc && <img src={imageSrc} alt="Sagittal Image" className="square-image" />}
      </div>
    </div>
  );
};

export default SagittalImageFetcher;
