import React from 'react';
import style from './APIorDBFilter.module.css';

const APIorDBFilter = ({formAPIDB, APIDBHandler}) => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>Filter by API or DB</h1>
            <select onChange={APIDBHandler} className={style.select}>
                <option>Select Filter:</option>
                <option name="API">API</option>
                <option name="DB">DB</option>
            </select>
        </div>
    )
}

export default APIorDBFilter