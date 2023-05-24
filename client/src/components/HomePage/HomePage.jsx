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
  // despachamos acciones de redux con el hook useDispatch:
  const dispatch = useDispatch();
  // dogs: obtenemos el estado dogs del store de Redux con el hook useSelector:
  const dogs = useSelector(state => state.dogs);
  // temperaments: obtenemos el estado temperaments del store de redux con el hook useSelector:
  const allTemperaments = useSelector(state => state.temperaments);
  // filter: obtenemos el estado filter del store de redux con el hook useSelector:
  const filter = useSelector(state => state.filter);
  // dogsPerPage: define la cantidad de perros
  // que se mostrarán por página en la paginación:
  const dogsPerPage = 8;
  // pageNumberLimit: define el límite máximo
  // de números de página que se mostrarán en la paginación:
  const pageNumberLimit = 5;
  // items: estado que almacena la lista de perros que se mostrarán en la página actual:
  const [items, setItems] = useState([]);
  // currentPage: estado que almacena el número de la página actual:
  const [currentPage, setCurrentPage] = useState(0);
  // maxPageNumberLimit: estado que almacena el límite máximo de números
  // de página que se mostrarán en la paginación:
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  // minPageNumberLimit: estado que almacena el límite mínimo de números
  // de página que se mostrarán en la paginación:
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  // form: Es un estado que almacena los valores seleccionados en el filtro de temperamentos:
  const [form, setForm] = useState({ temperaments: [] });
  // formAPIDB: Es un estado que almacena los valores seleccionados en el filtro de API/DB:
  const [formAPIDB, setformAPIDB] = useState({ filterApiDB: [] });
  // se utilizan en el componente para gestionar el estado de la paginación y los filtros de búsqueda

  // verificamos si la lista de perros (dogs) tiene elementos y
  // si la lista de items (items) está vacía. Si se cumple esta condición,
  // se asigna a items una porción de la lista de perros que va desde el índice 0 hasta dogsPerPage:
  if (dogs.length > 0 && items.length === 0) setItems([...dogs].splice(0, dogsPerPage));

  // Uso el hook useEffect para realizar ciertas acciones cuando el componente HomePage
  // se renderiza en pantalla
  // Cada dispatch corresponde a una acción definida en el código y
  // se llama utilizando el método dispatch proporcionado por useDispatch()
  useEffect(() => {
    // getAllDogs(): Obtiene todos los perros:
      dispatch(getAllDogs());
    // getAllTemperaments(): Obtiene todos los temperamentos disponibles:
      dispatch(getAllTemperaments());
    // resetDog(): Reinicia el perro seleccionado actualmente, estableciendo su valor en vacío:
      dispatch(resetDog());
    // resetDogs(): Reinicia la lista de perros, estableciéndola en vacía.
      dispatch(resetDogs());
    // resetFilter(): Reinicia el estado del filtro, estableciéndolo en false.
      dispatch(resetFilter());
    // El parámetro [dispatch] especifica las dependencias del efecto, 
    // lo que significa que este efecto se ejecutará solo cuando dispatch cambie.
    // En este caso, el efecto se ejecutará una vez al inicio del componente.
  }, [dispatch]);


  // Usamos el hook realizar una acción cuando se detecta
  // un cambio en las dependencias dispatch, filter o dogs:
  useEffect(() => {
    // El efecto se ejecuta cuando el valor de filter es true
      if (filter === true) {
        // se actualizan los valores de estado currentPage,
        // maxPageNumberLimit y minPageNumberLimit para restablecer la paginación.
          setCurrentPage(0);
          setmaxPageNumberLimit(5);
          setminPageNumberLimit(0);
        // se actualiza el estado items utilizando la función setItems
        // crear una copia del array dogs y luego se utiliza el método
        // splice para obtener un subconjunto de elementos que corresponda
        // a la página actual. Este subconjunto de elementos se asigna al estado items:
          setItems([...dogs].splice(0, dogsPerPage));
        // se despacha la acción resetFilter para restablecer el estado filter a false,
        // lo que indica que se ha aplicado el filtro y se ha completado el proceso de paginación.
          dispatch(resetFilter());
      }
      // la idea es actualizar la paginación y los elementos mostrados
      // en la página cuando se aplica un filtro y se cambia el estado filter a true.
  }, [dispatch, filter, dogs]);

  const temperamentsHandler = (event) => {
    // obtenemos el valor seleccionado del elemento mediante event.target.value:
      const value = event.target.value;
    // utilizamos el método setForm para actualizar el estado form
      setForm({
    // creamos una copia del objeto form existente, y luego se actualiza
    // la propiedad temperaments agregando el nuevo valor seleccionado al final
    // del array utilizando el operador de propagación nuevamente:
          ...form, temperaments: [...form.temperaments, value],
      });
      // se despacha la acción  el filtro de temperamento en los perros y
      // actualizar el estado correspondiente
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
      // se despacha la acción apiOrDbFilter mediante dispatch
      // se encarga de aplicar el filtro de API o DB en los perros y
      // actualizar el estado correspondiente en el almacenamiento (Redux).
      dispatch(apiOrDbFilter(dogs, value));
  }

  // firstHandler se utiliza para manejar el evento de hacer clic
  // en el botón de la primera página en la paginación: 
  const firstHandler = (firstPage) => {
    // se calcula el índice de inicio para los perros de
    // la página actual multiplicando firstPage por dogsPerPage
      const firstIndex = firstPage * dogsPerPage;
    // se utiliza el método splice junto con el operador de propagación (...)
    // para obtener un subconjunto de perros a partir del índice calculado,
    // con una longitud de dogsPerPage:
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      // actualizan los estados relacionados con la paginación:
      setCurrentPage(firstPage);
      setmaxPageNumberLimit(5);
      setminPageNumberLimit(0);
  }
// prevHandler se utiliza para manejar el 
// evento de hacer clic en el botón de página anterior en la paginación:
  const prevHandler = () => {
      const prevPage = currentPage - 1;
      // se calcula el índice de inicio para los perros
      // de la página anterior multiplicando prevPage por dogsPerPage:
      const firstIndex = prevPage * dogsPerPage;
      // Si prevPage es menor que 0, significa que ya se encuentra en la primera página
      if (prevPage < 0) return;
      // Si prevPage es mayor o igual a 0, se utiliza el método splice junto
      // con el operador de propagación (...) para obtener un subconjunto de
      // perros a partir del índice calculado:
      setItems([...dogs].splice(firstIndex, dogsPerPage));
      // se actualizan los estados relacionados con la paginación:
      setCurrentPage(prevPage);
      // Si el número de página actual (currentPage) es un múltiplo
      // del límite de números de página (pageNumberLimit),
      // significa que el límite superior de los números de página debe actualizarse:
      if ((currentPage) % pageNumberLimit === 0) {
        // setmaxPageNumberLimit se establece en maxPageNumberLimit - pageNumberLimit
        // para reducir el límite superior en el valor de pageNumberLimit:
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        // se actualiza el límite inferior de los números de página restando
        // pageNumberLimit a minPageNumberLimit utilizando setminPageNumberLimit.
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
  }

  // nextHandler se utiliza para manejar el evento
  // de hacer clic en el botón de página siguiente en la paginación:
  const nextHandler = () => {
    // se obtiene la cantidad total de perros:
      const totalDogs = dogs.length;
    // calcula el número de página siguiente sumando 1 al valor de currentPage:
      const nextPage = currentPage + 1;
    // se calcula el índice de inicio para los perros de la página siguiente:
      const firstIndex = nextPage * dogsPerPage;
    // si no hay más perros para mostrar y se retorna:
      if (firstIndex > totalDogs) return;
      // se utiliza el método splice junto con el operador de propagación (...)
      // para obtener un subconjunto de perros a partir del índice calculado:
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