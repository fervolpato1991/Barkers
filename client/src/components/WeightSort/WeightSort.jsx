import React from 'react';
import { useDispatch } from 'react-redux';
import { weightSort } from '../../redux/actions';
import styles from './WeightSort.module.css';

const WeightSort = ({dogs}) => {
    const dispatch = useDispatch();
    
    const weightSortHandler = (event) => {
        const value = event.target.value;
        dispatch(weightSort(dogs, value));
    }
    return (
        <div className={styles.container}>
            <h2>Sort by dog weight:</h2>
            <select onChange={weightSortHandler}>
                <option>Select weight order:</option>
                <option value='heavyToLight' name='heavyToLight'>Heavy to light</option>
                <option value='lightToHeavy' name='lightToHeavy'>Light to heavy</option>
            </select>
        </div>
    )
}

export default WeightSort