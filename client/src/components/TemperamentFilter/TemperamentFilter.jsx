import React from "react";
import style from "./TemperamentFilter.module.css";

const TemperamentFilter = ({form, allTemperaments, temperamentsHandler}) => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>Filter by temperament</h1>
            <select onChange={temperamentsHandler}>
                <option defaultValue> Select temperament</option>
                {allTemperaments.map((temp) => {
                    return (
                        <option key={temp.id} name={temp.name}>
                            {temp.name}
                        </option>
                    );
                })}
            </select>
            <div>
                {form.temperaments.map((element) => (
                    <span key={element}>{element}</span>
                ))}
            </div>
        </div>
    )
}

export default TemperamentFilter