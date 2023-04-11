import { FILTER_CONTINENT, GET_ALL_COUNTRIES, ORDER_COUNTRY, ORDER_POPULATION, FILTER_COUNTRY, GET_ALL_ACTIVITIES, FILTER_CREATED, FILTER_PAG, FILTER_ID } from "./actionType";
import axios from "axios";


export function getAllActivities() {
    return async (dispatch) => {
        try {
            const result = await axios.get("http://localhost:3001/activities")
            dispatch({ type: GET_ALL_ACTIVITIES, payload: result.data })
        } catch (error) {
            console.log("error", error.message);
        }
    }
}

export function getAllCountries() {
    return async (dispatch) => {
        try {
            const results = await axios.get("http://localhost:3001/countries")
            dispatch({ type: GET_ALL_COUNTRIES, payload: results.data })
        } catch (error) {
            console.log("error", error.message);
        }
    }
}


export function filterContinent(contin) {
    // console.log(contin);
    return {
        type: FILTER_CONTINENT,
        payload: contin

    }
}

export function filterCreated(payload) {
    console.log(payload);
    return {
        type: FILTER_CREATED,
        payload
    }
}


export function orderCountry(ordCountry) {
    return {
        type: ORDER_COUNTRY, payload: ordCountry
    }
}

export function orderPopulation(popu) {

    return {
        type: ORDER_POPULATION, payload: popu
    }
}

// export function filterCountryByName(name) {
//     return async (dispatch) => {
//         try {
//             const countryName = await axios.get("http://localhost:3001/countries?name=" + name);
//             console.log("actiooooooooooooooooooooooooooooooooo", countryName)
//             dispatch({
//                 type: FILTER_COUNTRY,
//                 payload: countryName.data.name
//             })
//         } catch (error) {
//             console.log("error", error);
//         }
//     }
// }

// export function filterCountryByName(name) {
//     return async (dispatch) => {
//         try {
//             const response = await axios.get(`http://localhost:3001/countries?name=${name}`)
//             const countryNames = response.data.map((country) => country.name) // Extrae los nombres de los países que coinciden con la búsqueda
//             dispatch({ type: FILTER_COUNTRY, payload: countryNames })
//         } catch (error) {
//             console.log("error", error);
//         }
//     }
// }


// export function filterCountryByName(name) {
//     return async (dispatch) => {
//         try {
//             const countryName = await axios.get(`http://localhost:3001/countries?name=${name}`)
//             console.log("actiooooooooooooooooooooooooooooooooo", countryName)
//             dispatch({ type: FILTER_COUNTRY, payload: countryName.data.name })
//         } catch (error) {
//             console.log("error", error);
//         }
//     }
// }

// export function filterCountryByName(name) {
//     return async (dispatch) => {
//         try {
//             const countryName = await axios.get(`http://localhost:3001/countries?name=${name}`)
//             console.log("actiooooooooooooooooooooooooooooooooo", countryName)
//             dispatch({ type: FILTER_COUNTRY, payload: countryName.data.name })
//         } catch (error) {
//             console.log("Error occurred while filtering countries: ", error);
//             throw error;
//         }
//     }
// }




export const filterCountryByName = (name) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FILTER_COUNTRY, payload: name });
        } catch (error) {
            console.log("Error occurred while filtering countries: ", error);
        }
    };
};

export const pagNum = (number) => {
    return async (dispatch) => {
        dispatch({
            type: FILTER_PAG,
            payload: number
        });
    }
};

export const filterCountryById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FILTER_ID, payload: id });
        } catch (error) {
            console.log("Error, Not ID", error);
        }
    };
};

export function postActivities(payload) {
    return async (dispatch) => {
        const response = await axios.post("http://localhost:3001/activities", payload);
        console.log(response);
        return response;
    }
}