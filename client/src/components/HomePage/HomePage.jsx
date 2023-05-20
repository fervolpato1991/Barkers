import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDogs,
  getAllTemperaments,
  apiOrDbFilter,
  temperamentFilter,
  resetDog,
  resetDogs,
  resetFilter,
  alphabeticSort,
  weightSort
} from '../../redux/actions';
import APIorDBFilter from '../APIorDBFilter/APIorDBFilter';
import TemperamentFilter from '../TemperamentFilter/TemperamentFilter';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';
import AlphabeticSort from '../AlphabeticSort/AlphabeticSort';
import WeightSort from '../WeightSort/WeightSort';
import style from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const filter = useSelector((state) => state.filter);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [form, setForm] = useState({ temperaments: [] });
  const [formAPIDB, setFormAPIDB] = useState({ filterApiDB: [] });
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageNumberLimit = 5;
  const dogsPerPage = 8;

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
    dispatch(resetDog());
    dispatch(resetDogs());
    dispatch(resetFilter());
  }, [dispatch]);

  useEffect(() => {
    if (filter === true) {
      setCurrentPage(0);
      setMaxPageNumberLimit(5);
      setMinPageNumberLimit(0);
      setItems([...dogs].splice(0, dogsPerPage));
      dispatch(resetFilter());
    }
  }, [dispatch, filter, dogs]);

  if (dogs.length > 0 && items.length === 0)
    setItems([...dogs].splice(0, dogsPerPage));

  const temperamentsHandler = (event) => {
    const value = event.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      temperaments: [...prevForm.temperaments, value],
    }));
    dispatch(temperamentFilter(dogs, value));
  };

  const APIorDBHandler = (event) => {
    const value = event.target.value;
    setFormAPIDB((prevFormAPIDB) => ({
      ...prevFormAPIDB,
      filterApiDB: [...prevFormAPIDB.filterApiDB, value],
    }));
    dispatch(apiOrDbFilter(dogs, value));
  };
  const alphabeticSortHandler = (value) => {
    dispatch(alphabeticSort(dogs, value));
  };
  const weightSortHandler = (value) => {
    dispatch(weightSort(dogs, value));
  };


  const firstHandler = (firstPage) => {
    const firstIndex = firstPage * dogsPerPage;
    setItems([...dogs].splice(firstIndex, dogsPerPage));
    setCurrentPage(firstPage);
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    const firstIndex = prevPage * dogsPerPage;
    if (prevPage < 0) return;
    setItems([...dogs].splice(firstIndex, dogsPerPage));
    setCurrentPage(prevPage);
    if (currentPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit((prevLimit) => prevLimit - pageNumberLimit);
      setMinPageNumberLimit((prevLimit) => prevLimit - pageNumberLimit);
    }
  };

  const nextHandler = () => {
    const totalDogs = dogs.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * dogsPerPage;
    if (firstIndex > totalDogs) return;
    setItems([...dogs].splice(firstIndex, dogsPerPage));
    setCurrentPage(nextPage);
    if (currentPage + 2 > maxPageNumberLimit) {
      setMaxPageNumberLimit((prevLimit) => prevLimit + pageNumberLimit);
      setMinPageNumberLimit((prevLimit) => prevLimit + pageNumberLimit);
    }
  };

  const lastHandler = (lastPage) => {
    const firstIndex = lastPage * dogsPerPage;
    setItems([...dogs].splice(firstIndex, dogsPerPage));
    setCurrentPage(lastPage);
    setMaxPageNumberLimit(5 * Math.ceil(lastPage / 5));
    setMinPageNumberLimit(5 * Math.floor(lastPage / 5));
  };

  const pagination = (numberPage) => {
    const firstIndex = numberPage * dogsPerPage;
    setItems([...dogs].splice(firstIndex, dogsPerPage));
    setCurrentPage(numberPage);
  };

  const clearHandler = () => {
    setFormAPIDB({ filterApiDB: [] });
    setForm({ temperaments: [] });
    dispatch(getAllDogs());
  };

  return (
    <div className={style.container}>
      <div>
        <ul>
          <li>
            <SearchBar />
          </li>
          <li>
            <AlphabeticSort dogs={dogs} alphabeticSortHandler={alphabeticSortHandler}/>
          </li>
          <li>
            <WeightSort dogs={dogs} weightSortHandler={weightSortHandler}/>
          </li>
          <li>
            <APIorDBFilter
              formAPIDB={formAPIDB}
              APIorDBHandler={APIorDBHandler}
            />
          </li>
          <li>
            <TemperamentFilter
              form={form}
              allTemperaments={allTemperaments}
              temperamentsHandler={temperamentsHandler}
            />
          </li>
          <li>
            <button
              type="submit"
              onClick={clearHandler}
              className={style.button}
            >
              Close Filters
            </button>
          </li>
        </ul>
      </div>
      <Pagination
        firstHandler={firstHandler}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        lastHandler={lastHandler}
        pagination={pagination}
        totalDogs={dogs.length}
        dogsPerPage={dogsPerPage}
        currentPage={currentPage}
        pageNumberLimit={pageNumberLimit}
        minPageNumberLimit={minPageNumberLimit}
        maxPageLimit={maxPageNumberLimit}
      />
      <Cards dogs={items} />
    </div>
  );
};

export default HomePage;