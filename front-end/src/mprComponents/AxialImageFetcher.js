// // AxialImageFetcher.js
// import React, { useState } from 'react';

// const AxialImageFetcher = () => {
//   const [zCoordinate, setZCoordinate] = useState('');
//   const [imageSrc, setImageSrc] = useState('');

//   const handleFetchImage = async () => {
//     try {
//       const response = await fetch(`/axial/${zCoordinate}`);
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
//     <div className="axial-fet-container">
//       <div className="axial-fet-input-container">
//         <label>
//           Enter Z Coordinate(0-188):
//           <input type="text" value={zCoordinate} onChange={(e) => setZCoordinate(e.target.value)} />
//         </label>
//       </div>
//       <button onClick={handleFetchImage}>Fetch Axial Image</button>

//       {imageSrc && <img src={imageSrc} alt="Axial Image" className="square-image" />}
//     </div>
//   );
// };

// export default AxialImageFetcher;

// AxialImageFetcher.js
// import React, { useState, useEffect } from 'react';

// const AxialImageFetcher = () => {
//   const [zCoordinate, setZCoordinate] = useState('');
//   const [imageSrc, setImageSrc] = useState('');

//   useEffect(() => {
//     // Fetch initial image when the component mounts
//     handleFetchImage();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   const handleFetchImage = async () => {
//     try {
//       const response = await fetch(`/axial/${zCoordinate}`);
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

//   const handleZCoordinateChange = (e) => {
//     setZCoordinate(e.target.value);
//   };

//   return (
//     <div className="axial-fet-container">
//       <div className="axial-fet-input-container">
//         <label>
//           Enter Z Coordinate (0-188):
//           <input type="range" min="0" max="188" value={zCoordinate} onChange={handleZCoordinateChange} />
//           {zCoordinate}
//         </label>
//       </div>
//       <button onClick={handleFetchImage}>Fetch Axial Image</button>

//       {imageSrc && <img src={imageSrc} alt="Axial Image" className="square-image" />}
//     </div>
//   );
// };

// export default AxialImageFetcher;

import React, { useState, useEffect, useRef } from 'react';

const AxialImageFetcher = () => {
  const middleValue = 94; // Middle value for the range input (assuming the middle is around 94 for 0-188)
  const [zCoordinate, setZCoordinate] = useState(middleValue);
  const [imageSrc, setImageSrc] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch initial image
    fetchImage(zCoordinate);

    // Scroll to the middle position when the component mounts
    if (containerRef.current) {
      const middleScrollPosition = (containerRef.current.scrollWidth - containerRef.current.clientWidth) / 2;
      containerRef.current.scrollLeft = middleScrollPosition;
    }
  }, [zCoordinate]);

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
    <div className="axial-fet-container">
      <div className="axial-fet-input-container">
        <label className='info-colour'>
          Adjust Axial (0-188):
          <input
            type="range"
            min="0"
            max="188"
            value={zCoordinate}
            onChange={handleRangeChange}
            step="1"
          />
          {zCoordinate}
        </label>
      </div>

      <div
        className="scroll-container"
        ref={containerRef}
        onScroll={() => console.log('Scrolling...')} // Add your scroll handling logic here
        style={{ overflowX: 'auto', width: '100%', maxWidth: '400px', height: '500px', whiteSpace: 'nowrap' }}
      >
        {imageSrc && <img src={imageSrc} alt="Axial Image" className="square-image" />}
      </div>
    </div>
  );
};

export default AxialImageFetcher;
