import React from "react";
import style from "./CardsContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCountries, filterContinent, orderCountry, orderPopulation, filterCountryByName, getAllActivities } from "../redux/actions";
import Card from "../Card/Card";



const CardsContainer = () => {
//Obtiene los datos del estado global de Redux a través del hook useSelector.
  const countryWname = useSelector(state => state.countryWname);

/*Se inicializa el currentPage en 1, que se utilizará para la paginación de la lista de países. También se utiliza el hook useDispatch para hacer una llamada a dos acciones de Redux, getAllCountries y getAllActivities, que se ejecutarán cuando se monte el componente*/ 
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCountries())
    dispatch(getAllActivities())
  }, [dispatch])

/*Aquí se definen las constantes countries y filterCountry que obtienen los datos del estado global de Redux a través del hook useSelector.*/
  const countries = useSelector(state => state.countries)
  const filterCountry = useSelector(state => state.filterCountry)


/*handlerChange, que se ejecutará cuando se seleccione una opción en el filtro por continente. La función hace una llamada a la acción de Redux filterContinent, pasando el valor de la opción seleccionada. */
  const handlerChange = (event) => {
    dispatch(filterContinent(event.target.value))
}
  
/*upOrderHand, que se ejecutará cuando se seleccione una opción en el filtro de orden alfabético. La función hace una llamada a la acción de Redux orderCountry, pasando el arreglo de países ordenado según la opción seleccionada */
  const upOrderHand = (event) => {

    if (event.target.value === "ascending") {
        const countriesOrdenados = [...filterCountry].sort((a, b) => a.name.localeCompare(b.name))
        dispatch(orderCountry(countriesOrdenados))
    }

    if (event.target.value === "descending") {
        const countriesOrdenados = [...filterCountry].sort((a, b) => b.name.localeCompare(a.name))
        dispatch(orderCountry(countriesOrdenados))
    }
}

/*popOrderHand, que se ejecutará cuando se seleccione una opción en el filtro de orden por población. La función hace una llamada a la acción de Redux orderPopulation, pasando el arreglo de países ordenado según la opción seleccionada */
//   const popOrderHand = (event) => {
//     if (event.target.value === "maxPoblation") {
//         const maxPobCountry = [...filterCountry].sort((a, b) => b.population - a.population)
//         dispatch(orderPopulation(maxPobCountry))
//     }
//     if (event.target.value === "minPoblation") {
//         const maxPobCountry = [...filterCountry].sort((a, b) => a.population - b.population)
//         dispatch(orderPopulation(maxPobCountry))
//     }
// }

const [searchQuery, setSearchQuery] = useState(""); // State para almacenar la cadena de búsqueda y su función para actualizarla

const byNameHandler = (event) => { // Función que se ejecuta cada vez que cambia el valor del input de búsqueda
  setSearchQuery(event.target.value); // Actualiza el valor de la cadena de búsqueda con el texto del input
}

const countryN = (event) =>{ // Función que se ejecuta al hacer clic en el botón de búsqueda
  event.preventDefault(); // Previene que se recargue la página al enviar el formulario
  dispatch(filterCountryByName(searchQuery)); // Ejecuta la acción "filterCountryByName" con la cadena de búsqueda como argumento
}


return (
    <div className={style.conteiner}>
        <form >
            <input type="search" value={searchQuery} onChange={byNameHandler} />
            <button type="submit" onClick={countryN}>Buscar</button>
            <select onChange={handlerChange}>
                <option value=""></option>
                <option value="Antarctica">Antarctica</option>
                <option value="North America">North America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
                <option value="South America">South America</option>
            </select>

            <select onChange={upOrderHand}>
                <option value=""></option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>

            </select>

            {/* <select onChange={popOrderHand}>
                <option value=""></option>
                <option value="maxPoblation">MaxPoblation</option>
                <option value="minPoblation">MinPoblation</option>
            </select> */}

{countries && countries.map((country) => (
  <Card 
    key={country.id} 
    imgflag={country.imgflag} 
    name={country.name} 
    continent={country.continent} 
    population={country.population} 
    activities={country.Activities} 
  />
))}
        </form>

        {/* <Pagination currentPage={currentPage}
                setCurrentPage={setCurrentPage} countries={filterCountry} />
            {
                console.log(filterCountry)
            } */}

        </div>
    )

};

export default CardsContainer;