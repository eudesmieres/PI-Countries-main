import { useState } from "react";
import styles from "./Pagination.module.css"
import CardsContainer from "../CardsContainer/CardsContainer";



const Pagination = ({ countries, currentPage, setCurrentPage }) => {
    // defindo un estado que me muestre solo 10 juegos por pagina
    const [countriesPerPage] = useState(10);


    // creo una constante que me va a guardar el ultimo indice del elemento, por ejempo si estoy en pagina 1 * 15 = 15, 215 = 30
    const indexOfLastCountry = currentPage * countriesPerPage; // 1  /30 

    //creo una constaante que me traiga el primer indice de la paginacion actual y que me lo reste por el numero de elementos por pagina
    //por ejemplo, 15 - 15 = 1,    30-15 = 15
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 15 - 15

    // creo un nuevo arreglo que me va a traer los elementos que son requeridos usando las constantes anteriores
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

    // Cambiar de pagina y setear el nuevo indice para el slice
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div >
            <nav className={styles.nav}>
                {/* voy  a crear los botones de la paginacion usando Math ceil para que redondee y no me cree botones como 4.3,
                      hace la suma de countries = 100 / gamesperpage = 15 === 6.666 con ceil 6
            */}

                <ul className='pagination'>
                    {[...Array(Math.ceil(countries.length / countriesPerPage)).keys()].map(i => (
                        <li key={i} >

                            <button onClick={() => (paginate(i + 1))} >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            {

                currentCountries.map((countries, i) => {
                    return <CardsConccrftainer

                        imgflag={countries.imgflag}
                        name={countries.name}
                        continent={countries.continent}
                        activities={countries.activities}
                        key={i}
                    />

                })

            }
        </div>
    )
}

export default Pagination;