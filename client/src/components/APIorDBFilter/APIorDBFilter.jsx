import React from 'react';
import style from './APIorDBFilter.module.css';

const APIorDBFilter = ({formAPIDB, APIDBHandler}) => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>Filter by API or DB</h1>
            <select onChange={APIDBHandler}>
                <option>Select Filter:</option>
                <option name="API">API</option>
                <option name="DB">DB</option>
            </select>
            <div>
                {formAPIDB.filterApiDB.map((element) => 
                (<span key= {element}>{element}</span>))}
            </div>
        </div>
    )
}

export default APIorDBFilter