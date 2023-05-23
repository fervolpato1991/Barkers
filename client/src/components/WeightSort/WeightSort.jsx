import React  from "react";
import { weightSort } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./WeightSort.module.css"

const WeightSort = ({ dogs }) => {
    const dispatch = useDispatch();

    const sortHandlerLH = (event) => {
        const value = event.target.value;
        dispatch(weightSort(dogs, value));
        console.log(dogs)
        console.log(value)
    }

    return (
        <div className={style.container}>
            <h1 className={style.title}>Sort by weight: </h1>
            <select onChange={sortHandlerLH}>
                <option disabled defaultValue>Select order</option>
                <option name="low-high" value="low-high">Low to high</option>
                <option name="high-low" value="high-low">High to low</option>
            </select>
        </div>
    )
}

export default WeightSort;