import { GET_ALL_COUNTRIES, FILTER_CONTINENT, ORDER_COUNTRY, ORDER_POPULATION, FILTER_COUNTRY, GET_ALL_ACTIVITIES, FILTER_CREATED } from "./actionType";

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    filterSeason: "season",

    // filterCountry: [],
    // countryWname: [],
    activities: []
};




const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,

            }

        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
            }
        case FILTER_CONTINENT:
            const allCountries = state.allCountries
            const continentfilter = action.payload === "ALL" ? allCountries : allCountries.filter(cont => cont.continent === action.payload)
            console.log(continentfilter);
            return {
                ...state,
                countries: continentfilter

            }
        case FILTER_CREATED:
            const allActivities = state.allActivities;
            const filteredActivities = action.payload === "season" ? allActivities : allActivities.filter(activity => activity.season === action.payload)
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


        // case ORDER_POPULATION:
        //     return {
        //         ...state,
        //         filterCountry: action.payload
        //     }
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
        default:
            return { ...state }
    }
}

export default rootReducer