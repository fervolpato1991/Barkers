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
            <h2 className={style.title}>Sort by dog name:</h2>
            <select onChange={alphabeticSortHandler}className={style.select}>
                <option className={style.option}>Select order:</option>
                <option name="ascendant" className={style.option}>ascendant</option>
                <option name="descendant" className={style.option}>descendant</option>
            </select>
        </div>
    )
}

export default AlphabeticSort;