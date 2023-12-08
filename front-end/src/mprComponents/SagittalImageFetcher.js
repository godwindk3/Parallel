// // SagittalImageFetcher.js
// import React, { useState } from 'react';

// const SagittalImageFetcher = () => {
//   const [yCoordinate, setYCoordinate] = useState('');
//   const [imageSrc, setImageSrc] = useState('');

//   const handleFetchImage = async () => {
//     try {
//       const response = await fetch(`/sagittal/${yCoordinate}`);
//       if (response.ok) {
//         const blob = await response.blob();
//         const imageUrl = URL.createObjectURL(blob);
//         setImageSrc(imageUrl);
//       } else {
//         console.error('Failed to fetch image:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="sagittal-fet-container">
//       <div className="sagittal-fet-input-container">
//         <label>
//           Enter Y Coordinate(0-511):
//           <input type="text" value={yCoordinate} onChange={(e) => setYCoordinate(e.target.value)} />
//         </label>
//       </div>
//       <button onClick={handleFetchImage}>Fetch Sagittal Image</button>

//       {imageSrc && <img src={imageSrc} alt="Sagittal Image" className="square-image" />}
//     </div>
//   );
// };

// export default SagittalImageFetcher;

// import React, { useState, useEffect, useRef } from 'react';
// import './ImageFetcher.css';
// const SagittalImageFetcher = () => {
//   const middleValue = 256; // Middle value for the range input (assuming the middle is around 256 for 0-511)
//   const [yCoordinate, setYCoordinate] = useState(middleValue);
//   const [imageSrc, setImageSrc] = useState('');
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Fetch initial image
//     fetchImage(yCoordinate);

//     // Scroll to the middle position when the component mounts
//     if (containerRef.current) {
//       const middleScrollPosition = (containerRef.current.scrollWidth - containerRef.current.clientWidth) / 2;
//       containerRef.current.scrollLeft = middleScrollPosition;
//     }
//   }, [yCoordinate]);

//   const fetchImage = async (coordinate) => {
//     try {
//       const response = await fetch(`/sagittal/${coordinate}`);
//       if (response.ok) {
//         const blob = await response.blob();
//         const imageUrl = URL.createObjectURL(blob);
//         setImageSrc(imageUrl);
//       } else {
//         console.error('Failed to fetch image:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleRangeChange = (e) => {
//     const newCoordinate = parseInt(e.target.value, 10);
//     setYCoordinate(newCoordinate);
//   };

//   return (
//     <div className="sagittal-fet-container">
//       <div className="sagittal-fet-input-container">
//         <label className='info-colour'>
//           Adjust Sagittal (0-511):
//           <input
//             type="range"
//             min="0"
//             max="511"
//             value={yCoordinate}
//             onChange={handleRangeChange}
//             step="1"
//           />
//           {yCoordinate}
//         </label>
//       </div>

//       <div
//         className="scroll-container"
//         ref={containerRef}
//         onScroll={() => console.log('Scrolling...')} // Add your scroll handling logic here
//         style={{overflowX: 'auto', width: '100%', maxWidth: '400px', maxHeight: '90%', whiteSpace: 'nowrap' }}
//       >
//         {imageSrc && <img src={imageSrc} alt="Sagittal Image" className="square-image" />}
//       </div>
//     </div>
//   );
// };

// export default SagittalImageFetcher;

// SagittalImageFetcher.js
import React, { useState, useEffect } from 'react';

const SagittalImageFetcher = ({ dataChanged }) => {
  const middleValue = 256;
  const [yCoordinate, setYCoordinate] = useState(middleValue);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Fetch image when yCoordinate or dataChanged changes
    fetchImage(yCoordinate);
  }, [yCoordinate, dataChanged]);

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
    <div className="sagittal-fet-container">
      <div className="sagittal-fet-input-container">
        <label className='info-colour'>
          <p>Adjust Sagittal (0-511):</p>
          <input
            type="range"
            min="0"
            max="511"
            value={yCoordinate}
            onChange={handleRangeChange}
            step="1"
          />
          {yCoordinate}
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
