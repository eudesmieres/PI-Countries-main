import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={style.NavContainer}>
            <div className={style.button}>
                <Link to="/">
            <button className={style.volver}>LOGIN</button></Link>
            <Link to="/home">
            <button className={style.home}>HOME</button></Link>
            <Link to="/create">
            <button className={style.form}>FORM</button></Link>
            </div>
        </div>
    )
}

export default NavBar;