import React from "react";
import style from "./TemperamentFilter.module.css";

const TemperamentFilter = ({form, allTemperaments, temperamentsHandler}) => {
    return (
        <div className={style.container}>
            <h1>Filter by temperament</h1>
            <select onChange={temperamentsHandler}>
                <option>Select temperament:</option>
                {allTemperaments.map((temperament) => {
                    return (
                        <option name={temperament.name} key={temperament.id}>
                            {temperament.name}
                        </option>
                    )
                })}
            </select>
            <div>
                {form.temperament.map((element) => (
                    <span key={element}>{element}</span>
                ))}
            </div>
        </div>
    )
}

export default TemperamentFilter