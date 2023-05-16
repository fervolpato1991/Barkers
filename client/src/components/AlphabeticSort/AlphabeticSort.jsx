import React from 'react';
import {useDispatch} from 'react-redux';
import style from './AlphabeticSort.module.css';
import {alphabeticSort} from '../../redux/actions';

const AlphabeticSort = ({dogs}) => {
    const dispatch = useDispatch();

    const alphabeticSortHandler = (event) => {
        const value = event.target.value;
        dispatch(alphabeticSort(dogs, value))
    }

    return (
        <div className={style.container}>
            <h2>Sort by dog name:</h2>
            <select onChange={alphabeticSortHandler}>
                <option>Select order:</option>
                <option name="ascendant">ascendant</option>
                <option name="descendant">descendant</option>
            </select>
        </div>
    )
}

export default AlphabeticSort;