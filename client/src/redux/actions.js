import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, API_OR_DB_FILTER, GET_DOGS_BY_NAME, GET_DOG_BY_ID, ALPHABETIC_SORT, WEIGHT_SORT, TEMPERAMENT_FILTER } from './action-types';
import axios from 'axios';

export const getAllDogs = () => {
    return async (dispatch) => {
        const dogs = await axios.get('http://localhost:3001/dogs');
        dispatch({
            type: GET_ALL_DOGS,
            payload: dogs.data
        })
    }
};
export const getAllTemperaments = () => async (dispatch) => {
    try {
        const allTemperaments = await axios('http://localhost:3001/temperaments');
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
        const dogId = await axios(`http://localhost:3001/dogs/${id}`);
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
        const dogName = await axios(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: dogName.data
        });
    } catch (error) {
        throw new Error(error);
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
        if (value === 'highToLow'){
            sortDogs = dogs.sort((a, b) => (a.minWeight < b.minWeight) ? 1 : (a.minWeight > b.minWeight) ? -1 : 0);
        }
        if(value === 'lowToHigh'){
            sortDogs = dogs.sort((a, b) => (a.minWeight > b.minWeight) ? 1 : (a.minWeight < b.minWeight) ? -1 : 0);
        }
        return (dispatch) => {
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
        let dogFilter = [];
        dogs.forEach(dog => {
            if(dog.from === value) dogFilter.push(dog);
        });
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
export const temperamentsFilter = (dogs, value) => {
    try {
        let dogFilter = [];
        dogs.forEach(dog => {
            if(dog.from === value) dogFilter.push(dog);
        })
    } catch (error) {
        throw new Error(error)
    }
};