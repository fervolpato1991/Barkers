import './App.css';
import { Route, useLocation } from 'react-router-dom';
import LandingPage  from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import TestComponent from './components/TestComponent/TestComponent';

function App() {
  const location = useLocation();


  return (
    <div className="App">
      {location.pathname === "/" ? <LandingPage/> : <NavBar/>}

        <Route path="/test" element={<TestComponent/>}/>
    </div>
  );
}

export default App;
