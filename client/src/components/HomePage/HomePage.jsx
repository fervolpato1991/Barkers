import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './HomePage.module.css';

const HomePage = () => {
    return (
        <div>
            <h1 className={style.title}>Home Page</h1>
        </div>
    )
}

export default HomePage;