import './App.css';
import { BrowserRouter as Routes, Switch , Route, useLocation } from 'react-router-dom';
import LandingPage  from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Switch>
          <Route exact path={"/"} component={LandingPage}/>
        </Switch>
        <Switch>
          <Route exact path={"/home"} component={HomePage}/>
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
