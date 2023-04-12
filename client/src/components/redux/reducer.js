import {
    GET_ALL_COUNTRIES, FILTER_CONTINENT, ORDER_COUNTRY,
    ORDER_POPULATION, FILTER_COUNTRY, GET_ALL_ACTIVITIES,
    FILTER_CREATED, FILTER_PAG, POST_CREATED, GET_DETAILS
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
        case FILTER_CONTINENT:
            const allCountries = state.allCountries
            const continentfilter = action.payload === "" ? allCountries : allCountries.filter(cont => cont.continent === action.payload)
            console.log(continentfilter);
            return {
                ...state,
                countries: continentfilter

            }
        case FILTER_CREATED:
            const activities = state.allCountries
            const filteredActivities = action.payload === "" ? activities : activities.filter(activity => activity.activities.find(filterseason => filterseason.season === action.payload))
            console.log(filteredActivities) // imprime las actividades filtradas por temporada
            return {
                ...state,

                countries: filteredActivities
            };

        case ORDER_COUNTRY:
            let sortedArr = action.payload === "ascending" ? state.countries.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: sortedArr
            }

        case ORDER_POPULATION:
            let sortedPopArr = action.payload === "minPoblation" ? state.countries.sort(function (a, b) {
                return a.population - b.population;
            }) :
                state.countries.sort(function (a, b) {
                    return b.population - a.population;
                });
            return {
                ...state,
                countries: sortedPopArr
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
            }

        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }



        default:
            return { ...state }
    }
}

export default rootReducer