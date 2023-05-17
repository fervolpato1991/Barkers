import './App.css';
import { BrowserRouter as Routes, Switch , Route, useLocation } from 'react-router-dom';
import LandingPage  from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import FormPage from './components/FormPage/FormPage';
import DetailPage from './components/DetailPage/DetailPage';
import NavBar  from './components/NavBar/NavBar';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar/>}
      <Routes>
        <Switch>
          <Route exact path={"/"} component={LandingPage}/>
        </Switch>
        <Switch>
          <Route exact path={"/home"} component={HomePage}/>
        </Switch>
        <Switch>
          <Route exact path={"/formPage"} component={FormPage}/>
        </Switch>
        <Switch>
          <Route exact path={"/detailPage"} component={DetailPage}/>
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
