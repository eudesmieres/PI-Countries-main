import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../components/redux/actions";
import { useEffect } from "react";
import style from "../Detail/Detail.module.css";


const Detail = () => {
const dispatch = useDispatch()
const { id } = useParams();


useEffect(() => {
dispatch(getDetail(id));
},[dispatch]) // eslint-disable-line


// Me traigo los estados globales que contienen todas las actividades y los paises por
const countries = useSelector((state) => state.detail)
const activi = useSelector((state) => state.allActivities)
return(
   <div>
        {
            
            <div className={style.cardetail}>
                <h1>Nombre {countries?.name}</h1>
                <img className={style.img} src= {countries?.imgflag} alt={countries?.imgflag}/>
                <h2>Detalles</h2>
                <h4>continent: {countries?.continent}</h4>
                <h4>capital: {countries?.capital}</h4>
                <h4>subregion: {countries?.subregion}</h4>
                <h4>area: {countries?.area}</h4>
                <h4>population: {countries?.population}</h4>
                <h2>Actividad Turistica</h2>
                <p>Activities: {activi?.length && activi[0]?.name }</p>
                <p>Dificulty: {activi?.length && activi[0]?.dificulty }</p>
                <p>Duration: {activi?.length && activi[0]?.duration }</p>
                <p>Season: {activi?.length && activi[0]?.season }</p>

            </div>
        }
        </div>
    )
}

export default Detail;