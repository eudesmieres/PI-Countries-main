import React from "react";
import { Link } from "react-router-dom";
import style from "../Landing/Landing.module.css";

const Landing = () => {
    return(
        <div className={style.body}>
           <h1>Bienvenido</h1>
            <Link to = '/home' >
                <button>INGRESAR</button>
            </Link>
        </div>
    )
}

export default Landing;