import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, API_OR_DB_FILTER,RESET_FILTER,  GET_DOGS_BY_NAME, GET_DOG_BY_ID, ALPHABETIC_SORT, WEIGHT_SORT, TEMPERAMENT_FILTER, RESET_DOG, RESET_DOGS } from './action-types';
import axios from 'axios';

export const getAllDogs = () => {
    return async (dispatch) => {
        const dogs = await axios.get('https://barkers-server.onrender.com/dogs');
        dispatch({
            type: GET_ALL_DOGS,
            payload: dogs.data
        })
    }
};
export const getAllTemperaments = () => async (dispatch) => {
    try {
        const allTemperaments = await axios('https://barkers-server.onrender.com/temperaments');
        const sortTemps = allTemperaments.data.sort((a, b) => a.name.localeCompare(b.name));
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: sortTemps
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getDogById = (id) => async(dispatch) => {
    try {
        const dogId = await axios(`https://barkers-server.onrender.com/dogs/${id}`);
        return dispatch({
            type: GET_DOG_BY_ID,
            payload: dogId.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getDogsByName = (name) => async(dispatch) => {
    try {
        const dogName = await axios(`https://barkers-server.onrender.com/dogs?name=${name}`);
        return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: dogName.data
        });
    } catch (error) {
        alert('Dog breed does not exist!')
    }
};
export const alphabeticSort = (dogs, value) => {
    try {
        let sortDogs = [];
        if (value === 'ascendant'){
            sortDogs = dogs.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (value === 'descendant'){
            sortDogs = dogs.sort((a, b) => b.name.localeCompare(a.name));
        }
        return (dispatch) => {
            dispatch({
                type: ALPHABETIC_SORT,
                payload: sortDogs
            })
        };
    } catch (error) {
        throw new Error(error);
    }
};
export const weightSort = (dogs, value) => {
    try {
        let sortDogs = [];
        if (value === 'high-low'){
            sortDogs = dogs.sort((a, b) => 
            (a.minWeight < b.minWeight) ? 1 : (a.minWeight > b.minWeight) ? -1 : 0);
        }
        if(value === 'low-high'){
            sortDogs = dogs.sort((a, b) => 
            (a.minWeight > b.minWeight) ? 1 : (a.minWeight < b.minWeight) ? -1 : 0);
        }
        return function (dispatch){
            dispatch({
                type: WEIGHT_SORT,
                payload: sortDogs
            })
        }
    } catch (error) {
        throw new Error(error);
    }
};
export const apiOrDbFilter = (dogs, value) => {
    try {
        const dogFilter = value === 'db' ?
        [...dogs].filter(dog => dog.db) :
        value === 'api' ?
        [...dogs].filter(dog => !dog.db) :
        dogs;
        return (dispatch) => {
            dispatch({
                type: API_OR_DB_FILTER,
                payload: dogFilter
            })
        }
    } catch (error) {
        throw new Error(error);
    }
};
export const temperamentFilter = (dogs, value) => {
    try {
        let dogFilter = [];
        dogs.forEach(dog => {
            const temps = [];
            if(dog.temperaments) temps.push(...dog.temperaments.split(", "));
            if(temps.includes(value)) dogFilter.push(dog);
        })
        return (dispatch) => {
            dispatch({
                type: TEMPERAMENT_FILTER,
                payload: dogFilter
            })
        }
    } catch (error) {
        throw new Error(error)
    }
};
export const resetDog = () => {
    return function (dispatch) {
        dispatch({ type: RESET_DOG })
    }
};
export const resetDogs = () => {
    return function (dispatch) {
        dispatch({ type: RESET_DOGS })
    }
};
export const resetFilter = () => {
    return function (dispatch) {
        dispatch({ type: RESET_FILTER })
    }
};