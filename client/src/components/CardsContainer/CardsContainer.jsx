import React from "react";
//import style from "./CardsContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCountries, filterContinent,filterCreated, orderCountry, orderPopulation, filterCountryByName, getAllActivities, pagNum } from "../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Pagination/Paginado";



const CardsContainer = () => {
//Obtiene los datos del estado global de Redux a través del hook useSelector.
  


const dispatch = useDispatch()
const [orden, setOrden]= useState('') // eslint-disable-line
const [population, setPopulation]= useState('') // eslint-disable-line
const [searchQuery, setSearchQuery] = useState('')
const countries = useSelector(state => state.countries)
const currentPage = useSelector(state => state.pag)
const [countriesPerPage, setCountriesPerPage] = useState(10) // eslint-disable-line
const indexOfLastCountry = currentPage * countriesPerPage; //10
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  
  useEffect(() => {
    dispatch(getAllCountries())
    dispatch(getAllActivities())
  }, [dispatch])


/* HandlerfilterContinent, filtra por continente. Hace un llamado a actions "filterContinent" */
  const handlerfilterContinent = (event) => {
    dispatch(filterContinent(event.target.value))
    dispatch (pagNum(1));
}

/* handlerfilterCreated, filtra por actividad/season. Hace un llamado a actions "filterCreatet" */
  const handlerfilterCreated = (event) => {
    dispatch(filterCreated(event.target.value))
  }
/* HandleSort,filtro de orden alfabético.hace un llamado a actions orderCountry */
  const handleSort = (event) => {
    event.preventDefault();
    dispatch(orderCountry(event.target.value))
    dispatch (pagNum(1));
    setOrden(event.target.value)
}

/* HandlePopulation,filtro de orden por población.hace un llamado a actions "orderPopulation"*/
const handlePopulation = (event) => {
  event.preventDefault();
  dispatch(orderPopulation(event.target.value))
  dispatch (pagNum(1));
  setPopulation(event.target.value)
}

// [searchQuery,setSearchQuery]= almacena la cadena de búsqueda y su función para actualizarla
useEffect(() => {
  if (searchQuery.trim() !== "") {
    dispatch(filterCountryByName(searchQuery));
  }else {
    dispatch(getAllCountries())
  }
},[searchQuery]) // eslint-disable-line


return (
    <div >
        <ul> 
          <input
          type="text"
          placeholder="Countries by name"
          onChange={ event => setSearchQuery(event.target.value)}/>
        </ul>
        <form>
            <select onChange={event => handlerfilterContinent(event)}>
                <option value="">CONTINENT</option>
                <option value="Asia">ASIA</option>
                <option value="North America">NORTH AMÉRICA</option>
                <option value="South America">SOUTH AMÉRICA</option>
                <option value="Africa">ÁFRICA</option>
                <option value="Antarctica">ANTARCTICA</option>
                <option value="Europe">EUROPA</option>
                <option value="Oceania">OCEANÍA</option>
            </select>

            <select onChange={event => handlerfilterCreated(event)}>
                <option value="">ACTIVIDAD POR SEASON</option>
                <option value="summer">SUMMER</option>
                <option value="autumn">AUTUMN</option>
                <option value="winter">WINTER</option>
                <option value="spring">SPRING</option>
            </select>

            <select onChange={event => handleSort(event)}>
                <option value="">ORDEN</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>

            </select>

            <select onChange={event => handlePopulation(event)}>
                <option value="">POBLACION</option>
                <option value="maxPoblation">MaxPoblation</option>
                <option value="minPoblation">MinPoblation</option>
            </select>
            </form>

<Paginado
countriesPerPage={countriesPerPage}
countries={countries.length}/>


{currentCountries?.map((countries) => {
  return (
  <Card 
  key={countries.id}
  id = {countries.id}
  imgflag={countries.imgflag}
  name={countries.name}
  continent={countries.continent}
  population={countries.population}
  activities={countries.activities}
  /> );
})} 
</div>
)

};

export default CardsContainer;