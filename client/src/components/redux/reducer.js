import { GET_ALL_COUNTRIES, FILTER_CONTINENT, ORDER_COUNTRY, ORDER_POPULATION, FILTER_COUNTRY, GET_ALL_ACTIVITIES, FILTER_CREATED, FILTER_PAG, POST_CREATED, FILTER_ID } from "./actionType";

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    filteredCountries: [],
    activities: [],
    lettersId: [],
    pag: 1,

    // filterCountry: [],
    // countryWname: [],
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
            const activities = state.activities
            const filteredActivities = action.payload === "" ? activities : activities.filter(activity => activity.season === action.payload)
            console.log(filteredActivities) // imprime las actividades filtradas por temporada
            return {
                ...state,

                allActivities: filteredActivities
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
        // case FILTER_COUNTRY:
        //     return {
        //         ...state,
        //         countries: action.payload
        //     }



        case FILTER_COUNTRY:
            const filteredCountries = state.countries.filter((country) =>
                country.name.toLowerCase().includes(action.payload.toLowerCase())
            );
            console.log(filteredCountries);
            return {
                ...state,
                countries: filteredCountries
            };



        // case FILTER_COUNTRY:
        //     state.filterCountry = action.payload
        //     return {
        //         ...state,
        //         countryWname: action.payload
        //     }
        // case GET_ALL_ACTIVITIES:
        //     // console.log("/////////////////ACTION\\\\\\\\\\\\", action.payload);
        //     return {
        //         ...state,
        //         activities: action.payload

        //     }

        case FILTER_PAG:
            return {
                ...state,
                pag: action.payload
            }

        case FILTER_ID:
            return {
                ...state,
                lettersId: action.payload
            }

        case POST_CREATED:
            return {
                ...state,
            }



        default:
            return { ...state }
    }
}

export default rootReducer