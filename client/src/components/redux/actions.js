import {
    GET_ALL_ACTIVITIES, GET_ALL_COUNTRIES,
    FILTER_COUNTRY, FILTER_PAG, GET_DETAILS, FILTERS
} from "./actionType";
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


export const filterCountryByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/countries?name=${name}`)
            dispatch({ type: FILTER_COUNTRY, payload: data })
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

// export const postActivities = (payload) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post("http://localhost:3001/activities", payload);
//             console.log(response);
//             dispatch({
//                 type: FILTERS,
//                 payload: response.data
//             });
//             return response

//         } catch (error) {
//             console.log("Error, Actividad no creada", error);
//         }
//         //return response;
//     }
// };

export const postActivities = (activity) => {
    return async function () {
        try {
            const newAct = await axios.post("http://localhost:3001/activities",
                activity
            ); console.log(newAct);
            return newAct
        } catch (error) {
            console.log("Error, Actividad no creada", error);
        }
    }
}



export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`http://localhost:3001/countries/${id}`);
            console.log(json.data);
            dispatch({
                type: GET_DETAILS,
                payload: json.data
            });
        } catch (error) {
            console.log("Error, Not ID", error);
        }
    };
};

export const filtersCountry = (countries) => {
    return async (dispatch) => {
        dispatch({
            type: FILTERS,
            payload: countries
        });
    }
}