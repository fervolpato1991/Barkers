import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage } from './component';

function App() {
  const location = useLocation();


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
