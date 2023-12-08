import './App.css';
// import Header from './components/Header/Header';
// import "./assets/js/script";
// import About from './components/About/About';
// import Portfolio from './components/Portfolio/Portfolio';
// import Footer from './components/Footer/Footer';
// import LeftPanel from './views/LeftPanel.js';
// import CenterPanel from './views/CenterPanel.js';
// import RightPanel from './views/RightPanel.js';
// import { SharedDataProvider } from './views/SharedDataContext.js';
// import ImageComponent from './mprComponents/ImageComponent.js';
// import React, { useState } from 'react';
// import ImageFetcher from './mprComponents/ImageFetcher.js';
// import AxialImageFetcher from './mprComponents/AxialImageFetcher.js';
// import SagittalImageFetcher from './mprComponents/SagittalImageFetcher.js';
// import DynamicDataFetcher from './mprComponents/DynamicDataFetcher.js';
// function App() {
//   const [dataChanged, setDataChanged] = useState(false);

//   const handleDataChange = () => {
//     // Toggle dataChanged to trigger a re-fetch in ImageComponent
//     setDataChanged((prev) => !prev);
//   }
//   return (
//     <div className="App">
//       <Header />
//       <About />
//       <Portfolio />
//       {/* <ImageComponent /> */}
//       <div className='app-container'>
//         <ImageFetcher />
//         <AxialImageFetcher />
//         <SagittalImageFetcher />
//       </div>
//       <DynamicDataFetcher onDataChanged={handleDataChange} />
//       <Footer />

//       {/* <SharedDataProvider>
//         <div style={{ display: 'flex' }}>
//           <LeftPanel />
//           <CenterPanel />
//           <RightPanel />
//         </div>
//       </SharedDataProvider> */}

//     </div>
//   );
// }

// export default App;

// App.js
import React, { useState } from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from './components/Footer/Footer';
import ImageFetcher from './mprComponents/ImageFetcher';
import AxialImageFetcher from './mprComponents/AxialImageFetcher';
import SagittalImageFetcher from './mprComponents/SagittalImageFetcher';
import DynamicDataFetcher from './mprComponents/DynamicDataFetcher';

function App() {
  const [dataChanged, setDataChanged] = useState(false);

  const handleDataChange = () => {
    setDataChanged((prev) => !prev);
  };

  return (
    <div className="App">
      <Header />
      <About />
      <Portfolio />
      <div className='app-container'>
        <ImageFetcher dataChanged={dataChanged} />
        <AxialImageFetcher dataChanged={dataChanged} />
        <SagittalImageFetcher dataChanged={dataChanged} />
      </div>
      <DynamicDataFetcher onDataChanged={handleDataChange} />
      <Footer />
    </div>
  );
}

export default App;
