import React, { useState } from 'react';
import './DynamicDataFetcher.css'

const DynamicDataFetcher = ({ onDataChanged }) => {
  const [degree, setDegree] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);

  const handleDegreeChange = (e) => {
    setDegree(parseInt(e.target.value, 10));
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/rotate_z/${degree}`);
      if (response.ok) {
        const data = await response.text();
        setApiResponse(data);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    onDataChanged(); // Trigger data change in parent component
  };

  return (
    <div className='rotate'>
      <h1>ROTATE:</h1>
      <p>{apiResponse}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Choose Degree (0-360):
          <input
            type="number"
            min="0"
            max="360"
            value={degree}
            onChange={handleDegreeChange}
          />
        </label>
        <br />
        <button type="submit" style={{color: 'white', border : '2px' , borderStyle : 'dashed'}}>Rotate</button>
      </form>
    </div>
  );
};

export default DynamicDataFetcher;

  