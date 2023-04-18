import { useHistory } from "react-router-dom";
import style from "./Card.module.css";


const Cards = (props) => {
    const navigate = useHistory();
    const nave = () =>{
        navigate.push(`/detail/${props.id}`)
    }
    return(
        <div className={style.country}
        onClick={nave}>
            
          <img className={style.image} src={props.imgflag} alt={props.name} />
          
          <h3>{props.name}</h3>
        
                <p>Oficial Name: {props.name}</p>
                <p>Continent: {props.continent}</p>
                <p>Poblacion: {props.population}</p>
            <p>Activities: {props.activities?.length && props.activities[0]?.name }</p>
            

        </div>
    );
}



export default Cards;