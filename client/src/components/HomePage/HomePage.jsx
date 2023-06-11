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

  // verificamos si la lista de perros (dogs) tiene elementos y
  // si la lista de items (items) está vacía. Si se cumple esta condición,
  // se asigna a items una porción de la lista de perros que va desde el índice 0 hasta dogsPerPage:
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
        // se actualizan los valores de estado currentPage,
          setCurrentPage(0);
          setmaxPageNumberLimit(5);
          setminPageNumberLimit(0);
        // se actualiza el estado items utilizando la función setItems
          setItems([...dogs].splice(0, dogsPerPage));
        // se despacha la acción resetFilter para restablecer el estado filter a false
          dispatch(resetFilter());
      }
      // la idea es actualizar la paginación y los elementos mostrados
      // en la página cuando se aplica un filtro y se cambia el estado filter a true.
  }, [dispatch, filter, dogs]);

  const temperamentsHandler = (event) => {
      const value = event.target.value;
    // utilizamos el método setForm para actualizar el estado form
      setForm({
          ...form, temperaments: [...form.temperaments, value],
      });
      dispatch(temperamentFilter(dogs, value));
      // Su fin es actualiza el estado form con el nuevo valor seleccionado y
      // despacha una acción para aplicar el filtro de temperamento en los perros.
  }

  const APIDBHandler = (event) => {
      const value = event.target.value;
      // se utiliza el método setformAPIDB para actualizar el estado formAPIDB:
      setformAPIDB({
      // Utilizamos spread para crear una copia del objeto formAPIDB existente,
      // y luego se actualiza la propiedad filterApiDB agregando el nuevo valor
      // seleccionado al final del array utilizando el operador de propagación nuevamente.
          ...formAPIDB, filterApiDB: [...formAPIDB.filterApiDB, value],
      });
      dispatch(apiOrDbFilter(dogs, value));
  }

  const firstHandler = (firstPage) => {
    // se calcula el índice de inicio para los perros de
    // la página actual multiplicando firstPage por dogsPerPage
      const firstIndex = firstPage * dogsPerPage;
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      // actualizan los estados relacionados con la paginación:
      setCurrentPage(firstPage);
      setmaxPageNumberLimit(5);
      setminPageNumberLimit(0);
  }
  const prevHandler = () => {
      const prevPage = currentPage - 1;
      // se calcula el índice de inicio para los perros
      // de la página anterior multiplicando prevPage por dogsPerPage:
      const firstIndex = prevPage * dogsPerPage;
      if (prevPage < 0) return;
      // Si prevPage es mayor o igual a 0, se utiliza el método splice junto
      // con el operador de propagación (...) para obtener un subconjunto de
      // perros a partir del índice calculado:
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      setCurrentPage(prevPage);
      // Si el número de página actual (currentPage) es un múltiplo
      // del límite de números de página (pageNumberLimit),
      // significa que el límite superior de los números de página debe actualizarse:
      if ((currentPage) % pageNumberLimit === 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
  }
  const nextHandler = () => {
      const totalDogs = dogs.length;
      const nextPage = currentPage + 1;
      const firstIndex = nextPage * dogsPerPage;
    // si no hay más perros para mostrar y se retorna:
      if (firstIndex > totalDogs) return;
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      //setCurrentPage se establece en nextPage para reflejar la página actual:
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