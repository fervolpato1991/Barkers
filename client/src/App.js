import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import FormPage from './components/FormPage/FormPage';
import DetailPage from './components/DetailPage/DetailPage';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/formPage" element={<FormPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
    </div>
  );
}

export default App;