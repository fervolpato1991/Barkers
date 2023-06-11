import React from 'react';
import style from './LandingPage.module.css';

class LandingPage extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(){
    super()
  }
  render() {
    return (
      <div className={style.landingpage}>
        <h1 className={style.title}>Welcome to Dogs webpage!</h1>
        <p className={style.description}>You will find here all dog breeds and their temperaments</p>
        <div>
          <form action="/home">
            <input type="submit" value="Enter" className={style.button} />
          </form>
        </div>
      </div>
    );
  }
}

export default LandingPage;