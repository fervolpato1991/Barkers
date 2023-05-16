import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import APIorDBFilter from '../APIorDBFilter/APIorDBFilter';
import Pagination from '../Pagination/Pagination';

import style from './HomePage.module.css';

const HomePage = () => {
    return (
        <div>
            <h1 className={style.title}>Home Page</h1>
            <Pagination/>
        </div>
    )
}

export default HomePage;