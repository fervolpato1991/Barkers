import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDogs,
  getAllTemperaments,
  apiOrDbFilter,
  temperamentFilter,
  resetDog,
  resetDogs,
  resetFilter
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
  const dogs = useSelector(state => state.dogs);
  const allTemperaments = useSelector(state => state.temperaments);
  const filter = useSelector(state => state.filter);
  const dogsPerPage = 8;
  const pageNumberLimit = 5;
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [form, setForm] = useState({ temperaments: [] });
  const [formAPIDB, setformAPIDB] = useState({ filterApiDB: [] });

  if (dogs.length > 0 && items.length === 0) setItems([...dogs].splice(0, dogsPerPage));

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
          setmaxPageNumberLimit(5);
          setminPageNumberLimit(0);

          setItems([...dogs].splice(0, dogsPerPage));
          dispatch(resetFilter());
      }
  }, [dispatch, filter, dogs]);

  const temperamentsHandler = (event) => {
      const value = event.target.value;
      setForm({
          ...form, temperaments: [...form.temperaments, value],
      });
      dispatch(temperamentFilter(dogs, value));
  }

  const APIDBHandler = (event) => {
      const value = event.target.value;
      setformAPIDB({
          ...formAPIDB, filterApiDB: [...formAPIDB.filterApiDB, value],
      });
      dispatch(apiOrDbFilter(dogs, value));
  }

  const firstHandler = (firstPage) => {
      const firstIndex = firstPage * dogsPerPage;
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      setCurrentPage(firstPage);
      setmaxPageNumberLimit(5);
      setminPageNumberLimit(0);
  }

  const prevHandler = () => {
      const prevPage = currentPage - 1;
      const firstIndex = prevPage * dogsPerPage;
      if (prevPage < 0) return;
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      setCurrentPage(prevPage);
      if ((currentPage) % pageNumberLimit === 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
  }

  const nextHandler = () => {
      const totalDogs = dogs.length;
      const nextPage = currentPage + 1;
      const firstIndex = nextPage * dogsPerPage;
      if (firstIndex > totalDogs) return;
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      setCurrentPage(nextPage);
      if (currentPage + 2 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
  }

  const lastHandler = (lastPage) => {
      const firstIndex = lastPage * dogsPerPage;
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      setCurrentPage(lastPage);
      setmaxPageNumberLimit(5 * Math.ceil(lastPage / 5));
      setminPageNumberLimit(5 * Math.floor(lastPage / 5));
  }

  const pagination = (numberPage) => {
      const firstIndex = numberPage * dogsPerPage;
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      setCurrentPage(numberPage);
  }

  const clearHandler = () => {
      formAPIDB.filterApiDB = [];
      form.temperaments = [];
      dispatch(getAllDogs());
  }
  return (
    <div className={style.container}>
      <div>
        <ul>
          <li>
            <SearchBar />
          </li>
          <li>
            <AlphabeticSort dogs={dogs}/>
          </li>
          <li>
            <WeightSort dogs={dogs}/>
          </li>
          <li>
            <APIorDBFilter
              APIDBHandler={APIDBHandler} 
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