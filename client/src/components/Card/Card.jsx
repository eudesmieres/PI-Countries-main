import CardsContainer from "../CardsContainer/CardsContainer";
import style from "./Card.module.css";

const Cards = (props) => {
    return(
        <div className={style.country}>
            
          <img src={props.imgflag} alt={props.name} /> 
          <p>Oficial Name: {props.name}</p>
            <p>Continent: {props.continent}</p>
            <p>Poblacio: {props.population}</p>
            {/* <p>Activities: {props.activities?.length && props.activities[0]?.name }</p> */}
            

        </div>
    );
}



export default Cards;