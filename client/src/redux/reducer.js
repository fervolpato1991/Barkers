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
    dogs: [],
    dog: [],
    temperaments: [],
    filter: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        case RESET_DOG:
                return { ...state, dog: [] }
        case RESET_DOGS:
                return { ...state, dogs: [] }
        case RESET_FILTER:
            return { ...state, filter: false }
        default:
            return {
                ...state
            };
    }
};

export default reducer;