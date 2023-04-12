
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Cards = (props) => {
    return(
        <div className={style.country}>
            
          <img className={style.image} src={props.imgflag} alt={props.name} />
          <Link 
          to={`/detail/${props.id}`}>
          <h3>{props.name}</h3>
          </Link> 
                <p>Oficial Name: {props.name}</p>
                <p>Continent: {props.continent}</p>
                <p>Poblacion: {props.population}</p>
            <p>Activities: {props.activities?.length && props.activities[0]?.name }</p>
            

        </div>
    );
}



export default Cards;