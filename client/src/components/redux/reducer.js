import { GET_ALL_COUNTRIES, FILTER_CONTINENT, ORDER_COUNTRY, ORDER_POPULATION, FILTER_COUNTRY, GET_ALL_ACTIVITIES } from "./actionType";

const initialState = {
    countries: [],
    filterCountry: [],
    countryWname: [],
    activities: []
};




const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                filterCountry: action.payload,

                countries: action.payload
            }
        case FILTER_CONTINENT:
            //state.filterCountry = state.countries
            // return {
            //     ...state,
            //     filterCountry: state.filterCountry.filter(cont => cont.continent === action.payload)
            // }
            return {
                ...state,
                filterCountry: state.countries.filter(cont => cont.continent === action.payload)
            }



        case ORDER_COUNTRY:
            return {
                ...state,
                filterCountry: action.payload
            }

        case ORDER_POPULATION:
            return {
                ...state,
                filterCountry: action.payload
            }
        case FILTER_COUNTRY:
            state.filterCountry = action.payload
            return {
                ...state,
                countryWname: action.payload
            }
        case GET_ALL_ACTIVITIES:
            // console.log("/////////////////ACTION\\\\\\\\\\\\", action.payload);
            return {
                ...state,
                activities: action.payload

            }
        default:
            return { ...state }
    }
}

export default rootReducer