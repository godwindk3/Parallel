import './App.css';
import Header from './components/Header/Header';
import "./assets/js/script";
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from './components/Footer/Footer';
import LeftPanel from './views/LeftPanel.js';
import CenterPanel from './views/CenterPanel.js';
import RightPanel from './views/RightPanel.js';
import { SharedDataProvider } from './views/SharedDataContext.js';
import ImageComponent from './ImageComponent.js';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <Portfolio />
      <ImageComponent />
      <Footer />
      {/* <SharedDataProvider>
        <div style={{ display: 'flex' }}>
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </div>
      </SharedDataProvider> */}

    </div>
  );
}

export default App;
//////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Header from './components/Header/Header';
// import About from './components/About/About';
// import Portfolio from './components/Portfolio/Portfolio';
// import Footer from './components/Footer/Footer';

// function App() {
//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await fetch('/image'); // Update the URL with your FastAPI server address
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
//     <div className="App">
//       <Header />
//       <About />
//       <Portfolio />
//       {imageSrc && <img src={imageSrc} alt="FastAPI Image" />} {/* Display the image */}
//       <Footer />
//     </div>
//   );
// }

// export default App;
