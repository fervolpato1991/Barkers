import {useState} from "react";
import {useDispatch} from 'react-redux';
import {getDogsByName} from '../../redux/actions';
import style from "./SearchBar.module.css";

const SearchBar = () => {
    const dispatch = useDispatch();

   const [searchName, setSearchName] = useState({
    name: '',
   });

   const handleChange = (event) =>{
      setSearchName({name: event.target.value})
   }

   const handleSubmit = () => {
    const name = searchName.name
    if(name.length > 0){
        dispatch(getDogsByName(name));
    }
   }

   return (
      <div  className={style.searchbar}>
         <input placeholder="Search..." type='search' onChange={handleChange} value={searchName.name} className={style.input}/>
         <button className={style.searchbutton} onClick={handleSubmit}>Search Breed</button>
      </div>
   );
}

export default SearchBar