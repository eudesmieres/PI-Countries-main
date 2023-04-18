import {
    GET_ALL_COUNTRIES, FILTER_COUNTRY, GET_ALL_ACTIVITIES, FILTER_PAG,
    POST_CREATED, GET_DETAILS, FILTERS
} from "./actionType";

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    filteredCountries: [],
    activities: [],
    lettersId: [],
    detail: [],
    pag: 1,
};




const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                pag: 1,
                countries: action.payload,
                allCountries: action.payload,
                lettersId: action.payload,


            }

        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
                activities: action.payload,
            }

        case FILTER_COUNTRY:
            return {
                ...state,
                countries: action.payload
            }

        case FILTER_PAG:
            return {
                ...state,
                pag: action.payload
            }

        case POST_CREATED:
            return {
                ...state,
                pag: 1,
            }

        case GET_DETAILS:
            return {
                ...state,
                pag: 1,
                detail: action.payload
            }
        case FILTERS:
            console.log(state.countries);
            return {
                ...state,
                pag: 1,
                countries: action.payload,
            }



        default:
            return { ...state }
    }
}

export default rootReducer