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

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <Portfolio />
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
