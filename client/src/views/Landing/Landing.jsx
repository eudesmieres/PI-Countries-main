import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <div>
            <h1>Esta es la vista de Landing</h1>
            <Link to = '/home' >
                <button>INGRESAR</button>
            </Link>
        </div>
    )
}

export default Landing;