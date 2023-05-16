import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getAllTemperaments, apiOrDbFilter, temperamentFilter  } from '../../redux/actions';
import APIorDBFilter from '../APIorDBFilter/APIorDBFilter';
import TemperamentFilter from '../TemperamentFilter/TemperamentFilter';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import Card from '../Card/Card';
import AlphabeticSort from '../AlphabeticSort/AlphabeticSort';
import WeightSort from '../WeightSort/WeightSort';
import style from './HomePage.module.css';


const HomePage = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const filter = useSelector(state => state.filter);
    const allTemperaments = useSelector(state => state.temperaments);
    const [form, setForm] = useState({ temperaments: [] });
    const [formAPIDB, setformAPIDB] = useState({ filterApiDB: [] });
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const pageNumberLimit = 5;
    const dogsPerPage = 8;

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());

    }, [dispatch]);

   
    return (
        <div>
            <div>
                <h1 className={style.title}>Home Page</h1>
                <ul>
                    <li><SearchBar/></li>
                    <li><AlphabeticSort/></li>
                    <li><WeightSort/></li>
                </ul>
            </div>
            <Pagination/>
        </div>
    )
}

export default HomePage;