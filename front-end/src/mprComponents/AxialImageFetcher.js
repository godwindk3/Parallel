import React, { useState, useEffect } from 'react';
const AxialImageFetcher = ({ dataChanged }) => {
  const [middleValue, setMiddleValue] = useState(null);
  const [zCoordinate, setZCoordinate] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [maxValue, setMaxValue] = useState(null);

  useEffect(() => {
    // Fetch size values from the API
    fetchSizeValues();
  }, []); // Fetch only once when the component mounts

  useEffect(() => {
    // Fetch image when zCoordinate or dataChanged changes
    fetchImage(zCoordinate);
  }, [zCoordinate, dataChanged]);

  const fetchSizeValues = async () => {
    try {
      const response = await fetch('/size');
      if (response.ok) {
        const data = await response.json();
        const initialMiddleValue = Math.floor(data.z / 2); // Set initial middleValue as the floor of z / 2
        setMiddleValue(initialMiddleValue);
        setZCoordinate(initialMiddleValue); // Set zCoordinate to the initial middleValue
        setMaxValue(data.z); // Set max value to the 'z' coordinate
      } else {
        console.error('Failed to fetch size values:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchImage = async (coordinate) => {
    try {
      const response = await fetch(`/axial/${coordinate}`);
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
    setZCoordinate(newCoordinate);
  };

  return (
    <div className="fet-container">
      <div className="axial-fet-input-container">
        <label className='info-colour'>
          <p>Adjust Axial (0-{maxValue !== null ? maxValue : ''}):</p>
          <input
            type="range"
            min="0"
            max={maxValue !== null ? maxValue : ''}
            value={zCoordinate !== null ? zCoordinate : ''}
            onChange={handleRangeChange}
            step="1"
          />
          {zCoordinate !== null ? zCoordinate : ''}
        </label>
      </div>

      <div
        className="scroll-container"
        style={{ overflowX: 'auto', width: '100%', maxWidth: '400px', height: '500px', whiteSpace: 'nowrap' }}
      >
        {imageSrc && <img src={imageSrc} alt="Axial Image" className="square-image" />}
      </div>
    </div>
  );
};

export default AxialImageFetcher;

