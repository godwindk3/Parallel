// // ImageFetcher.js
// import React, { useState } from 'react';
import './ImageFetcher.css';


// const ImageFetcher = () => {
//   const [xCoordinate, setXCoordinate] = useState('');
//   const [imageSrc, setImageSrc] = useState('');

//   const handleFetchImage = async () => {
//     try {
//       const response = await fetch(`/coronal/${xCoordinate}`);
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
//     <div className="fet-container">
//       <div className="fet-input-container">
//         <label>
//           Enter X Coordinate(0-511):
//           <input type="text" value={xCoordinate} onChange={(e) => setXCoordinate(e.target.value)} />
//         </label>
//       </div>
//       <button onClick={handleFetchImage}>Fetch Coronal Image</button>

//       {imageSrc && <img src={imageSrc} alt="Coronal Image" className="square-image" />}
//     </div>
//   );
// };

// export default ImageFetcher;



///////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';

// const ImageFetcher = () => {
//   const [xCoordinates, setXCoordinates] = useState([]);
//   const [currentXCoordinate, setCurrentXCoordinate] = useState(null);
//   const [imageSrc, setImageSrc] = useState('');

//   useEffect(() => {
//     // Generate an array of xCoordinates from 0 to 520
//     const generatedCoordinates = Array.from({ length: 521 }, (_, index) => index);
//     setXCoordinates(generatedCoordinates);
//   }, []);

//   const fetchImage = async (coordinate) => {
//     try {
//       const response = await fetch(`/coronal/${coordinate}`);
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

//   const handleButtonClick = () => {
//     // Fetch image based on the current xCoordinate
//     if (currentXCoordinate !== null) {
//       fetchImage(currentXCoordinate);
//     }
//   };

//   return (
//     <div className="fet-container">
//       <div className="fet-input-container">
//         <label>
//           Select X Coordinate:
//           <select onChange={(e) => setCurrentXCoordinate(e.target.value)}>
//             <option value="" disabled>Select an X Coordinate</option>
//             {xCoordinates.map((coordinate) => (
//               <option key={coordinate} value={coordinate}>
//                 {coordinate}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       <button onClick={handleButtonClick}>Fetch Coronal Image</button>

//       {imageSrc && <img src={imageSrc} alt="Coronal Image" className="square-image" />}
//     </div>
//   );
// };

// export default ImageFetcher;
// ImageFetcher.js
// ImageFetcher.js
// import React, { useState, useEffect, useRef } from 'react';


// const ImageFetcher = () => {
//   const middleValue = 260; // Middle value for the range input
//   const [xCoordinate, setXCoordinate] = useState(middleValue);
//   const [imageSrc, setImageSrc] = useState('');
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Fetch initial image
//     fetchImage(xCoordinate);

//     // Scroll to the middle position when the component mounts
//     if (containerRef.current) {
//       const middleScrollPosition = (containerRef.current.scrollWidth - containerRef.current.clientWidth) / 2;
//       containerRef.current.scrollLeft = middleScrollPosition;
//     }
//   }, [xCoordinate]);

//   const fetchImage = async (coordinate) => {
//     try {
//       const response = await fetch(`/coronal/${coordinate}`);
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
//     setXCoordinate(newCoordinate);
//   };

//   return (
//     <div className="fet-container">
//       <div className="fet-input-container">
//         <label className='info-colour'>
//           <p>Adjust Coronal(0-511):</p>
//           <input
//             type="range"
//             min="0"
//             max="520"
//             value={xCoordinate}
//             onChange={handleRangeChange}
//             step="1"
//           />
//           {xCoordinate}
//         </label>
//       </div>

//       <div
//         className="scroll-container"
//         ref={containerRef}
//         onScroll={() => console.log('Scrolling...')} // Add your scroll handling logic here
//         style={{overflowX: 'auto', width: '140%', maxWidth: '400px', maxHeight: '80%', whiteSpace: 'nowrap' }}
//       >
//         {imageSrc && <img src={imageSrc} alt="Coronal Image" className="square-image" />}
//       </div>
//     </div>
//   );
// };

// export default ImageFetcher;

// ImageFetcher.js
import React, { useState, useEffect } from 'react';

const ImageFetcher = ({ dataChanged }) => {
  const middleValue = 260;
  const [xCoordinate, setXCoordinate] = useState(middleValue);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Fetch image when xCoordinate or dataChanged changes
    fetchImage(xCoordinate);
  }, [xCoordinate, dataChanged]);

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
          <p>Adjust Coronal (0-511):</p>
          <input
            type="range"
            min="0"
            max="520"
            value={xCoordinate}
            onChange={handleRangeChange}
            step="1"
          />
          {xCoordinate}
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
