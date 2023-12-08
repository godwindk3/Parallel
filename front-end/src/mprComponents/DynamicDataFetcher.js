import React, { useState } from 'react';

// const DynamicDataFetcher = () => {
//     const [degree, setDegree] = useState(0); // Default degree is set to 0
//     const [apiResponse, setApiResponse] = useState(null);

//     const handleDegreeChange = (e) => {
//         setDegree(parseInt(e.target.value, 10));
//     };

//     const fetchData = async () => {
//         try {
//             const response = await fetch(`/rotate_z/${degree}`);
//             if (response.ok) {
//                 const data = await response.text();
//                 setApiResponse(data);
//             } else {
//                 console.error('Failed to fetch data:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetchData();
//     };

//     return (
//         <div>
//             <h1>ROTATE:</h1>
//             <p>{apiResponse}</p>

//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Choose Degree (0-180):
//                     <input
//                         type="number"
//                         min="-180"
//                         max="180"
//                         value={degree}
//                         onChange={handleDegreeChange}
//                     />
//                 </label>
//                 <button type="submit">Fetch Data</button>
//             </form>
//         </div>
//     );
// };

// export default DynamicDataFetcher;

// DynamicDataFetcher.js

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
    <div>
      <h1>ROTATE:</h1>
      <p>{apiResponse}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Choose Degree (0-180):
          <input
            type="number"
            min="-180"
            max="180"
            value={degree}
            onChange={handleDegreeChange}
          />
        </label>
        <button type="submit">Fetch Data</button>
      </form>
    </div>
  );
};

export default DynamicDataFetcher;

  