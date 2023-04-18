import React from "react";
//import style from "./CardsContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllActivities, getAllCountries, filterCountryByName, pagNum, filtersCountry } from "../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Pagination/Paginado";
import style from "./CardsContainer.module.css";



const CardsContainer = () => {
//Obtiene los datos del estado global de Redux a través del hook useSelector.
  


const dispatch = useDispatch()
const [orden, setOrden]= useState('') // eslint-disable-line
const [population, setPopulation]= useState('') // eslint-disable-line
const [searchQuery, setSearchQuery] = useState('')
const [season, setSeason] = useState('')
const [turistica, setTuristica] = useState('')
const [continent,  setContinent] = useState('')
const countries = useSelector(state => state.countries)
const currentPage = useSelector(state => state.pag)
const allCountries = useSelector(state => state.allCountries)
const [countriesPerPage, setCountriesPerPage] = useState(10) // eslint-disable-line
const indexOfLastCountry = currentPage * countriesPerPage; //10
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  
  useEffect(() => {
    dispatch(getAllCountries())
    dispatch(getAllActivities())
  }, [dispatch])


/* HandlerfilterContinent, filtra por continente. Hace un llamado a actions "filterContinent" */
//   const handlerfilterContinent = (event) => {
//     dispatch(filterContinent(event.target.value))
//     dispatch (pagNum(1));
// }

/* handlerfilterCreated, filtra por actividad/season. Hace un llamado a actions "filterCreatet" */
  // const handlerfilterCreated = (event) => {
  //   dispatch(filterCreated(event.target.value))
  // }
/* HandleSort,filtro de orden alfabético.hace un llamado a actions orderCountry */
//   const handleSort = (event) => {
//     event.preventDefault();
//     dispatch(orderCountry(event.target.value))
//     dispatch (pagNum(1));
//     setOrden(event.target.value)
// }

/* HandlePopulation,filtro de orden por población.hace un llamado a actions "orderPopulation"*/
// const handlePopulation = (event) => {
//   event.preventDefault();
//   dispatch(orderPopulation(event.target.value))
//   dispatch (pagNum(1));
//   setPopulation(event.target.value)
// }

// [searchQuery,setSearchQuery]= almacena la cadena de búsqueda y su función para actualizarla
useEffect(() => {
  if (searchQuery.trim() !== "") {
    dispatch(filterCountryByName(searchQuery));
    //dispatch (pagNum(1));
  }else {
    dispatch(getAllCountries())
  }
},[searchQuery]) // eslint-disable-line

useEffect(() => {
  handlesFilter();
},[continent, season, turistica, orden, population]) // eslint-disable-line

const handlesFilter = () => {
  let thisCountry = [...allCountries];
  if(continent !== '' || season !== '' || turistica !== '' || orden !== '' || population !== '') {
  if(continent !== '') thisCountry = thisCountry.filter(countrys => countrys.continent === continent)
  //if(season !== '') thisCountry = thisCountry.filter(countrys => countrys.activities.find(activiti => activiti.season === season))
  if(turistica !== '') thisCountry = thisCountry.filter(countrys => countrys.activities.find(turis => turis.name === turistica))
  if(orden === 'ascending') thisCountry = thisCountry.sort((a,z) => a.name.localeCompare(z.name))
  if(orden === 'descending') thisCountry = thisCountry.sort((a,z) => z.name.localeCompare(a.name))
  if(population === "minPoblation" ) thisCountry =thisCountry.sort((min,max) => min.population - max.population)
  if(population === "maxPoblation" ) thisCountry =thisCountry.sort((min,max) => max.population - min.population)
  dispatch(filtersCountry(thisCountry))
  }else {
  dispatch(filtersCountry(thisCountry))
  }

}


return (
    <div >
        <ul> 
          <input
          type="text"
          value={searchQuery}
          placeholder="Countries by name"
          onChange={ event => setSearchQuery(event.target.value)}/>
        </ul>
        <form>
            <select 
            value={continent}
            onChange={event => setContinent(event.target.value)}>
                <option value="">CONTINENT</option>
                <option value="Asia">ASIA</option>
                <option value="North America">NORTH AMÉRICA</option>
                <option value="South America">SOUTH AMÉRICA</option>
                <option value="Africa">ÁFRICA</option>
                <option value="Antarctica">ANTARCTICA</option>
                <option value="Europe">EUROPA</option>
                <option value="Oceania">OCEANÍA</option>
            </select>

            {/* <select
            value={season}
            onChange={event => setSeason(event.target.value)}>
                <option value="">ACTIVIDAD POR SEASON</option>
                <option value="summer">SUMMER</option>
                <option value="autumn">AUTUMN</option>
                <option value="winter">WINTER</option>
                <option value="spring">SPRING</option>
            </select> */}

            <select
            value={turistica}
            onChange={event => setTuristica(event.target.value)}>
                <option value="">ACTIVIDAD TURISTICA</option>
                <option value="Actividad turística">Actividad turística</option>
                <option value="Playas">Playas</option>
                <option value="Turismo de playa">Turismo de playa</option>
                <option value="excursion en las montañas">excursion en las montañas</option>
                <option value="Camping">Camping</option>
                <option value="Cata de Vino">Cata de Vino</option>
            </select>

            <select
            value={orden}
            onChange={event => (setOrden(event.target.value), setPopulation(''))}> 
                <option value="">ORDEN</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>

            </select>

            <select
            value={population}
             onChange={event => (setPopulation(event.target.value), setOrden('')) }>
                <option value="">POBLACION</option>
                <option value="minPoblation">MinPoblation</option>
                <option value="maxPoblation">MaxPoblation</option>
            </select>
            <button 
            type="button"
            onClick={() => (setOrden(''),setPopulation(''),setSeason(''), setContinent (''), setSearchQuery(''), setTuristica(''))}
            >Limpiar</button>
            </form>

<Paginado
countriesPerPage={countriesPerPage}
countries={countries.length}/>


<div className={style.countryCar}>
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
</div>
)

};

export default CardsContainer;