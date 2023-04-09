import React from "react";
import style from "./CardsContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCountries, filterContinent,filterCreated, orderCountry, orderPopulation, filterCountryByName, getAllActivities } from "../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Pagination/Paginado";



const CardsContainer = () => {
//Obtiene los datos del estado global de Redux a través del hook useSelector.
  const countryWname = useSelector(state => state.countryWname);

/*Se inicializa el currentPage en 1, que se utilizará para la paginación de la lista de países. También se utiliza el hook useDispatch para hacer una llamada a dos acciones de Redux, getAllCountries y getAllActivities, que se ejecutarán cuando se monte el componente*/ 
const dispatch = useDispatch()
const [orden, setOrden]= useState('')
const [population, setPopulation]= useState('')
const countries = useSelector(state => state.countries)
const [currentPage, setCurrentPage] = useState(1)
const [countriesPerPage, setCountriesPerPage] = useState(10)
const indexOfLastCountry = currentPage * countriesPerPage; //10
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //0
const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
};

  
  
  useEffect(() => {
    dispatch(getAllCountries())
    dispatch(getAllActivities())
  }, [dispatch])

/*Aquí se definen las constantes countries y filterCountry que obtienen los datos del estado global de Redux a través del hook useSelector.*/
  const filterCountry = useSelector(state => state.filterCountry)


/* HandlerfilterContinent, filtra por continente. Hace un llamado a actions "filterContinent" */
  const handlerfilterContinent = (event) => {
    dispatch(filterContinent(event.target.value))
}


  const handlerfilterCreated = (event) => {
    dispatch(filterCreated(event.target.value))
  }
/* HandleSort,filtro de orden alfabético. La función hace una llamada a la acción de Redux orderCountry, pasando el arreglo de países ordenado según la opción seleccionada */
  const handleSort = (event) => {
    event.preventDefault();
    dispatch(orderCountry(event.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`)
}

/*popOrderHand, que se ejecutará cuando se seleccione una opción en el filtro de orden por población. La función hace una llamada a la acción de Redux orderPopulation, pasando el arreglo de países ordenado según la opción seleccionada */
const handlePopulation = (event) => {
  event.preventDefault();
  dispatch(orderPopulation(event.target.value))
  setCurrentPage(1);
  setPopulation(`Population ${event.target.value}`)
}

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
            <input type="search" value={searchQuery} onChange={event => byNameHandler(event)} />
            <button type="submit" onClick={event => countryN(event)}>Buscar</button>
            <select onChange={event => handlerfilterContinent(event)}>
                <option value="ALL">ALL</option>
                <option value="Asia">ASIA</option>
                <option value="North America">NORTH AMÉRICA</option>
                <option value="South America">SOUTH AMÉRICA</option>
                <option value="Africa">ÁFRICA</option>
                <option value="Antarctica">ANTARCTICA</option>
                <option value="Europe">EUROPA</option>
                <option value="Oceania">OCEANÍA</option>
            </select>

            <select onChange={event => handlerfilterCreated(event)}>
                <option value="season">SEASON</option>
                <option value="summer">SUMMER</option>
                <option value="autumn">AUTUMN</option>
                <option value="winter">WINTER</option>
                <option value="spring">SPRING</option>
            </select>

            <select onChange={event => handleSort(event)}>
                <option value=""></option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>

            </select>

            <select onChange={event => handlePopulation(event)}>
                <option value=""></option>
                <option value="maxPoblation">MaxPoblation</option>
                <option value="minPoblation">MinPoblation</option>
            </select>

{/* {countries && countries.map((country) => (
  <Card 
    key={country.id} 
    imgflag={country.imgflag} 
    name={country.name} 
    continent={country.continent} 
    population={country.population} 
    activities={country.Activities} 
  />
))} */}

<Paginado
countriesPerPage={countriesPerPage}
countries={countries.length}
Paginado={paginado}
/>
{/* {console.log(countries.length)} */}

{currentCountries?.map((countries) => {
  return (
  <Card 
  key={countries.id}
  imgflag={countries.imgflag}
  name={countries.name}
  continent={countries.continent}
  population={countries.population}
  activities={countries.activities}
  

    // key={country.id} 
    // imgflag={country.imgflag} 
    // name={country.name} 
    // continent={country.continent} 
    // population={country.population} 
    // activities={country.Activities} 
  /> );
})} 
        </form>

        {/* <Pagination
         currentPage={currentPage}
         setCurrentPage={setCurrentPage}
         countries={filterCountry} />
            {
                console.log(filterCountry)
            } */}

        </div>
    )

};

export default CardsContainer;