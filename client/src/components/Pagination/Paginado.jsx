import React from "react";
import { useDispatch } from "react-redux";
import { pagNum } from "../redux/actions";


const Paginado = ({ countries, countriesPerPage}) => {
    const dispatch = useDispatch();
    const pageNumbers = []

    for ( let i=1; i<=Math.ceil(countries /countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <div className="paginado">
                { pageNumbers && 
                pageNumbers.map(number => ( 
                
                    <button 
                    className="number" key={number}
                    type="button" 
                    onClick={() => dispatch (pagNum(number))} >
                                {number}
                            </button>
                ))}
            </div>
        </nav>
    )
    
}


export default Paginado;