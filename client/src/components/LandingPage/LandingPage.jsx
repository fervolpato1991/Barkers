import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={style.landingpage}>
            <h1>Welcome to Dogs webpage!</h1>
            <p>You will find here all dog breeds and their temperaments</p>
            <NavLink to="/home" className={style.link}>
                <button>Hop in</button>
                </NavLink>
        </div>
    )
}


export default LandingPage;