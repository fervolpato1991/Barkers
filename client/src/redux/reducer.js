import { GET_ALL_DOGS,
         GET_ALL_TEMPERAMENTS,
         API_OR_DB_FILTER,
         GET_DOGS_BY_NAME,
         GET_DOG_BY_ID,
         ALPHABETIC_SORT,
         WEIGHT_SORT,
         TEMPERAMENT_FILTER,
         RESET_DOG,
         RESET_DOGS,
         RESET_FILTER } from './action-types';

const initialState = {
    // dogs para la lista de perros:
    dogs: [],
    // dog para la perro individual:
    dog: [],
    // temperaments para la lista de temperamentos:
    temperaments: [],
    // filter para indicar filtro:
    filter: false
};

const reducer = (state = initialState, action) => {
    // se utiliza un switch para evaluar el tipo de acción y
    // realizar las actualizaciones correspondientes en el estado:
    switch (action.type) {
        // Cada caso de acción actualiza el estado con los datos proporcionados
        // en la acción y establece el indicador de filtro en true para indicar que
        // se ha aplicado un filtro:
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filter: true
            }
        case GET_DOG_BY_ID:
            return {
                ...state,
                dog: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload,
                filter: true
            }
        case ALPHABETIC_SORT:
            return {
                ...state,
                dogs: action.payload,
                filter: true
            }
        case WEIGHT_SORT:
            return {
                ...state,
                dogs: action.payload,
                filter: true
            }
        case TEMPERAMENT_FILTER:
            return {
                ...state,
                dogs: action.payload,
                filter: true
            }
        case API_OR_DB_FILTER:
            return {
                ...state,
                dogs: action.payload,
                filter: true
            }
            // Los casos de RESET_DOG, RESET_DOGS y RESET_FILTER restablecen las propiedades
            // dog, dogs y filter respectivamente a sus valores iniciales:
        case RESET_DOG:
                return { 
                    ...state, 
                    dog: []
                 }
        case RESET_DOGS:
                return { 
                    ...state, 
                    dogs: [] 
                }
        case RESET_FILTER:
            return { 
                ...state,
                 filter: false 
                }
            // Si la acción no coincide con ningún caso,
            // el reducer devuelve el estado actual sin realizar cambios:
        default:
            return {
                ...state
            };
    }
    // se gestiona el estado de la aplicación y 
    // actualiza las propiedades dogs, dog, temperaments y filter según las acciones recibidas.
};

export default reducer;