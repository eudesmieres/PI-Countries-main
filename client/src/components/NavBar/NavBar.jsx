import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={style.NavContainer}>

            <Link to="/home">Home</Link>
            <Link to="/create">Form</Link>
        </div>
    )
}

export default NavBar;