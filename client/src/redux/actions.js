import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, API_OR_DB_FILTER,RESET_FILTER,  GET_DOGS_BY_NAME, GET_DOG_BY_ID, ALPHABETIC_SORT, WEIGHT_SORT, TEMPERAMENT_FILTER, RESET_DOG, RESET_DOGS } from './action-types';
import axios from 'axios';

export const getAllDogs = () => {
    return async (dispatch) => {
        // se realiza la solicitud GET:
        const dogs = await axios.get('http://localhost:3001/dogs');
        // Una vez que se recibe la respuesta,
        // se despacha una acción de tipo GET_ALL_DOGS con los datos de perros obtenidos
        // como carga útil (payload):
        dispatch({
            type: GET_ALL_DOGS,
            payload: dogs.data
        })
    }
    // esta acción se utiliza para obtener todos los perros de una API
    // y almacenarlos en el estado de Redux para su posterior uso en la aplicación.
};
export const getAllTemperaments = () => async (dispatch) => {
    try {
        // se realiza una solicitud GET utilizando axios a la URL 'http://localhost:3001/temperaments'
        // para obtener todos los temperamentos:
        const allTemperaments = await axios('http://localhost:3001/temperaments');
        // Una vez que se recibe la respuesta, se ordenan los temperamentos en orden alfabético
        // utilizando el método sort en el arreglo de datos obtenido:
        const sortTemps = allTemperaments.data.sort((a, b) => a.name.localeCompare(b.name));
        return dispatch({
            // Luego se despacha una acción de tipo GET_ALL_TEMPERAMENTS
            // con los temperamentos ordenados como carga útil (payload),
            // para almacenarlos en el estado de Redux:
            type: GET_ALL_TEMPERAMENTS,
            payload: sortTemps
        });
    } catch (error) {
        // Si se produce un error durante la solicitud,
        // se lanza una excepción con el error correspondiente:
        throw new Error(error);
        // En resumen, esta acción se utiliza para obtener todos los temperamentos de la API,
        // ordenarlos y almacenarlos en el estado de Redux para su posterior uso en la aplicación.
    }
};
export const getDogById = (id) => async(dispatch) => {
    try {
        // se realiza una solicitud GET utilizando axios a la URL http://localhost:3001/dogs/${id},
        // donde ${id} es el ID del perro que se desea obtener.
        // Una vez que se recibe la respuesta, se extraen los datos del perro desde dogId.data:
        const dogId = await axios(`http://localhost:3001/dogs/${id}`);
        return dispatch({
            // Luego se despacha una acción de tipo GET_DOG_BY_ID con los datos
            // del perro como payload, para almacenarlos en el estado de Redux:
            type: GET_DOG_BY_ID,
            payload: dogId.data
        });
    } catch (error) {
        // Si se produce un error durante la solicitud,
        // se lanza una excepción con el error correspondiente:
        throw new Error(error);
    }
    // esta acción se utiliza para obtener los detalles de un perro por su ID desde la API
    // y almacenarlos en el estado de Redux para su posterior uso en la aplicación.
};
export const getDogsByName = (name) => async(dispatch) => {
    try {
        // se realiza una solicitud GET 
        // donde ${name} es el nombre del perro que se desea buscar.
        const dogName = await axios(`http://localhost:3001/dogs?name=${name}`);
        // Una vez que se recibe la respuesta,
        // se extraen los datos de los perros encontrados desde dogName.data.
        return dispatch({
            // se despacha una acción de tipo GET_DOGS_BY_NAME con los datos de los perros
            // como payload, para almacenarlos en el estado de Redux.
            type: GET_DOGS_BY_NAME,
            payload: dogName.data
        });
    } catch (error) {
        alert('Dog breed does not exist!')
    }
    // esta acción se utiliza para buscar perros por su nombre en la API
    // y almacenar los resultados en el estado de Redux para su posterior uso en la aplicación.
};
export const alphabeticSort = (dogs, value) => {
    // Recibe dos parámetros: dogs, que es el arreglo de perros a ordenar,
    // y value, que especifica el tipo de ordenamiento 
    // ("ascendant" para ascendente y "descendant" para descendente).
    try {
        // se declara una variable sortDogs para almacenar los perros ordenados. 
        let sortDogs = [];
        // Si el valor es "ascendant", se utiliza el método sort con la función de comparación
        // a.name.localeCompare(b.name) para ordenar los perros en orden ascendente según el nombre:
        if (value === 'ascendant'){
            sortDogs = dogs.sort((a, b) => a.name.localeCompare(b.name));
        }
        // Si el valor es "descendant", se invierte el orden comparando b.name.localeCompare(a.name):
        if (value === 'descendant'){
            sortDogs = dogs.sort((a, b) => b.name.localeCompare(a.name));
        }
        // se devuelve una función que tiene acceso al objeto dispatch:
        return (dispatch) => {
            // se despacha una acción de tipo ALPHABETIC_SORT
            // con los perros ordenados como carga útil (payload),
            // para almacenarlos en el estado de Redux:
            dispatch({
                type: ALPHABETIC_SORT,
                payload: sortDogs
            })
        };
    } catch (error) {
        // Si se produce un error durante el proceso de ordenamiento,
        // se lanza una excepción con el error correspondiente:
        throw new Error(error);
    }
    // esta acción se utiliza para ordenar los perros alfabéticamente
};
export const weightSort = (dogs, value) => {
    // Recibe dos parámetros: dogs, que es el arreglo de perros a ordenar,
    // y value, que especifica el tipo de ordenamiento
    try {
        // se declara una variable sortDogs para almacenar los perros ordenados:
        let sortDogs = [];
        // Si el valor es "high-low", se utiliza el método sort con una función de comparación
        // para ordenar los perros en orden descendente según el peso mínimo.: 
        if (value === 'high-low'){
            // Compara los valores de minWeight de dos perros a y b en el arreglo dogs.
            // Si el peso mínimo de a es menor que el peso mínimo de b, se devuelve 1,
            // lo que indica que a debe estar después de b en el orden: 
            sortDogs = dogs.sort((a, b) => 
            (a.minWeight < b.minWeight) ? 1 : (a.minWeight > b.minWeight) ? -1 : 0);
            // Si el peso mínimo de a es mayor que el peso mínimo de b, se devuelve -1,
            // lo que indica que a debe estar antes de b en el orden.
            // Si ambos pesos mínimos son iguales, se devuelve 0,
            // lo que indica que no hay diferencia en el orden entre a y b.
        }
        // Si el valor es "low-high", se invierte el orden comparando:
        if(value === 'low-high'){
            sortDogs = dogs.sort((a, b) => 
            (a.minWeight > b.minWeight) ? 1 : (a.minWeight < b.minWeight) ? -1 : 0);
        }
        // devuelve una función que tiene acceso al objeto dispatch:
        return function (dispatch){
            // se despacha una acción de tipo WEIGHT_SORT con los perros ordenados
            // como payload, para almacenarlos en el estado de Redux:
            dispatch({
                type: WEIGHT_SORT,
                payload: sortDogs
            })
        }
    } catch (error) {
        // Si se produce un error durante el proceso de ordenamiento,
        // se lanza una excepción con el error correspondiente:
        throw new Error(error);
    }
    // esta acción se utiliza para ordenar los perros por peso
    // en función del valor especificado y almacenar los resultados
    // en el estado de Redux para su posterior uso en la aplicación.
};
export const apiOrDbFilter = (dogs, value) => {
    // Se recibe el arreglo de perros (dogs) y el valor del filtro (value).
    // Los filtros son 'db' si provienen de la base de datos y 'api' si
    // provienen de la api.
    try {
        // Si el valor del filtro es 'db'
        const dogFilter = value === 'db' ?
        // se realiza una copia del arreglo de perros ([...dogs]) y
        // se filtran solo los perros que tienen la propiedad db como true.
        // Esto significa que solo se seleccionarán los perros que provienen de la base de datos.
        [...dogs].filter(dog => dog.db) :
        // Si el valor del filtro es 'api'
        value === 'api' ?
        // se realiza una copia del arreglo de perros ([...dogs])
        // y se filtran solo los perros que no tienen la propiedad db.
        // Esto significa que solo se seleccionarán los perros que provienen de la API:
        [...dogs].filter(dog => !dog.db) :
        // Si el valor del filtro no coincide con ninguna de las opciones anteriores,
        // se devuelve el arreglo de perros sin cambios:
        dogs;
        return (dispatch) => {
            // retorna una función (dispatch) que envía la acción al store
            // con el tipo API_OR_DB_FILTER y el resultado del filtro como carga útil:
            dispatch({
                type: API_OR_DB_FILTER,
                payload: dogFilter
            })
        }
    } catch (error) {
        throw new Error(error);
    }
    // este código se utiliza para filtrar los perros en función de
    // si provienen de la base de datos o de la API.
};
export const temperamentFilter = (dogs, value) => {
    // Se recibe el arreglo de perros (dogs) y el valor del temperamento a filtrar (value).
    try {
        // Se crea un arreglo vacío llamado dogFilter para almacenar los perros
        // que coincidan con el temperamento filtrado:
        let dogFilter = [];
        // Se recorre cada perro en el arreglo dogs utilizando un bucle forEach:
        dogs.forEach(dog => {
            // Para cada perro, se crea un arreglo llamado
            // temps para almacenar los temperamentos del perro:
            const temps = [];
            // Si el perro tiene temperamentos (es decir, la propiedad temperaments no es nula),
            // se agregan los temperamentos al arreglo temps
            if(dog.temperaments) temps.push(...dog.temperaments.split(", "));
            // se verifica si el arreglo temps incluye el temperamento específico
            // que se está filtrando (value). Si es así, el perro se agrega al arreglo dogFilter:
            if(temps.includes(value)) dogFilter.push(dog);
        })
        return (dispatch) => {
            // se retorna una función (dispatch) que envía la acción al store
            // con el tipo TEMPERAMENT_FILTER y el arreglo dogFilter como payload.
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
    // Retorna una función (dispatch) que envía una acción al store con el tipo RESET_DOG.
    return function (dispatch) {
        // Al enviar esta acción, se indica al store que
        // se deben restablecer los datos del perro específico.
        dispatch({ type: RESET_DOG })
    }
    // esta función se utiliza para restablecer los datos
    // de un perro específico en el store
};
export const resetDogs = () => {
    // Retorna una función (dispatch) que envía una acción al store con el tipo RESET_DOGS.
    return function (dispatch) {
        // Al enviar esta acción,
        // se indica al store que se deben restablecer todos los perros y limpiar su información.
        dispatch({ type: RESET_DOGS })
    }
    // esta función se utiliza para restablecer todos los perros en el store,
};
export const resetFilter = () => {
    // Retorna una función (dispatch) que envía una acción al store con el tipo RESET_FILTER:
    return function (dispatch) {
        // Al enviar esta acción, se indica al store que se debe restablecer el filtro
        // por temperamentos y mostrar todos los perros sin ningún filtro adicional.
        dispatch({ type: RESET_FILTER })
    }
    // esta función se utiliza para restablecer el filtro aplicado
    // y mostrar todos los perros sin ninguna restricción adicional.
};