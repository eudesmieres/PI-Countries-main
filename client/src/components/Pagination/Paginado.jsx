import React from "react";

const Paginado = ({ countries, countriesPerPage,paginado }) => {
    const pageNumbers = []

    for ( let i=0; i<=Math.ceil(countries /countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="paginado">
                { pageNumbers && 
                pageNumbers.map(number => ( 
                <li className="number" key={number}>
                    <button onClick={() => (paginado(number + 1))} >
                                {number + 1}
                            </button>
                    {/* <a onClick={() => paginate(number)}>{number}</a> */}
                </li>
                ))}
            </ul>
        </nav>
    )
    
}


export default Paginado;