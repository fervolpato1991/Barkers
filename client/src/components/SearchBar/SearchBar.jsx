import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
   getAllDogs,
   getDogsByName,
   apiOrDbFilter,
   getAllTemperaments,
   temperamentFilter,
   resetDog,
   resetDogs,
   resetFilter } from '../../redux/actions';
import style from "./SearchBar.module.css";
import AlphabeticSort from '../AlphabeticSort/AlphabeticSort';
import WeightSort from '../WeightSort/WeightSort';
import APIorDBFilter from '../APIorDBFilter/APIorDBFilter';
import TemperamentFilter from '../TemperamentFilter/TemperamentFilter';

const SearchBar = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector(state => state.temperaments);
    const [formAPIDB, setformAPIDB] = useState({ filterApiDB: [] });
    const [form, setForm] = useState({ temperaments: [] });

    useEffect(() => {
      dispatch(getAllDogs());
      dispatch(getAllTemperaments());
      dispatch(resetDog());
      dispatch(resetDogs());
      dispatch(resetFilter());
  }, [dispatch]);

   const [searchName, setSearchName] = useState({
    name: '',
   });

   const APIDBHandler = (event) => {
      const value = event.target.value;
      setformAPIDB({
          ...formAPIDB, filterApiDB: [...formAPIDB.filterApiDB, value],
      });
      dispatch(apiOrDbFilter(dogs, value));
  }

   const handleChange = (event) =>{
      setSearchName({name: event.target.value})
   }

   const handleSubmit = () => {
    const name = searchName.name
    if(name.length > 0){
        dispatch(getDogsByName(name));
    }
   }

   const temperamentsHandler = (event) => {
      const value = event.target.value;
      setForm({
          ...form, temperaments: [...form.temperaments, value],
      });
      dispatch(temperamentFilter(dogs, value));
  }

  const clearHandler = () => {
   formAPIDB.filterApiDB = [];
   form.temperaments = [];
   dispatch(getAllDogs());
}

return (
  <div className={style.container}>
    <div className={style.row}>
      <AlphabeticSort dogs={dogs} />
      <WeightSort dogs={dogs} />
      <APIorDBFilter APIDBHandler={APIDBHandler} />
      <TemperamentFilter
        form={form}
        allTemperaments={allTemperaments}
        temperamentsHandler={temperamentsHandler}
      />
      <button
        type="submit"
        onClick={clearHandler}
        className={style.button}
      >
        Close Filters
      </button>
      <input
      placeholder="Search..."
      type="search"
      onChange={handleChange}
      value={searchName.name}
      className={style.input}
    />
        <button className={style.searchbutton} onClick={handleSubmit}>
      Search Breed
    </button>
    </div>
  </div>
);
}

export default SearchBar;