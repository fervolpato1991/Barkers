import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { getAllTemperaments } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './DetailPage.module.css';
import validation from '../../validation';

const DetailPage = () => {
    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch]);
    return (
        <div>

        </div>
    )
}

export default DetailPage;