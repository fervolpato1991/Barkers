import './App.css';
import { BrowserRouter as Routes, Switch , Route, useLocation } from 'react-router-dom';
import LandingPage  from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import FormPage from './components/FormPage/FormPage';
import DetailPage from './components/DetailPage/DetailPage';

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
