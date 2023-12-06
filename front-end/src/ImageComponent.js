// import React, { useState, useEffect } from 'react';
// import './ImageComponent.css'; // Import the CSS file

// const ImageComponent = () => {
//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await fetch('/image');
//         const blob = await response.blob();
//         const url = URL.createObjectURL(blob);
//         setImageSrc(url);
//       } catch (error) {
//         console.error('Error fetching image:', error);
//       }
//     };

//     fetchImage();
//   }, []);

//   return (
//     <div className="image-container"> {/* Apply the CSS class */}
//       {imageSrc && <img src={imageSrc} alt="FastAPI Image" />} {/* Display the image */}
//     </div>
//   );
// };

// export default ImageComponent;
import React, { useState, useEffect } from 'react';
import './ImageComponent.css';

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

    // Fetch image on mount
    fetchImage();

    // Set up periodic polling every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchImage, 4000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div className="image-container">
      {imageSrc && <img src={imageSrc} alt="FastAPI Image" />}
    </div>
  );
};

export default ImageComponent;


