import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postActivities } from "../../components/redux/actions";
import styles from "../Form/Form.module.css";


// "name", "dificulty", "duration", "season"
export const validate = ({ name, dificulty, duration, season, countries }) => {
    const errors = {};
    errors.name = name === "" ? "Need a name" : errors.name;
    errors.dificulty = dificulty > 0 || dificulty <= 5 ? errors.dificulty : "Only between 1 and 5";
    errors.duration = isNaN(duration) || duration <= 0 ? "Activity duration is invalid" : errors.duration;
    errors.season = !season ? "A season is required" : errors.season;
    errors.countries = countries.length < 3 ? "Country without 3 letters" : errors.countries;
    
    return errors;
}

const Form = () => {
    const dispatch = useDispatch();
    //const lettersId = useSelector(state => state.lettersId)

    const history = useHistory();
    const [inputs, setInputs] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countries: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countries: ""
    })
   //Lee lo que escribo y lo guarda en el stado
    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value

        setErrors(validate({ ...inputs, [property]: value }))
        setInputs({ ...inputs, [property]: value })
    }

    
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(postActivities(inputs))
         alert("Actividad Creada")
         setInputs({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countries: ""
         })
         history.push("/home")
         
    }

 return (

    <div className={styles.form}>
        <h1>CREAR ACTIVIDAD</h1>
            <form onSubmit={(event)=>submitHandler(event)} >
             <label className={styles.heading}>Actividad:</label>
             <input type="text"
             className={styles.input}
             onChange={(event)=>changeHandler(event)}
             value={inputs.name}
             name="name"></input>
            {errors.name && (<p style={{color: "red"}} className="error">{errors.name}</p>)}

            <label className={styles.heading}>Dificulty:</label>
            <input type="number"
            className={styles.input}
            onChange={(event)=>changeHandler(event)}
            value={inputs.dificulty}
            name="dificulty"></input>

            <label className={styles.heading}>Duration:</label>
            <input type="time"
            onChange={(event)=>changeHandler(event)}
            value={inputs.duration}
            name="duration"></input>

            <label className={styles.heading}>Country:</label>
            <input type="text"
            onChange={(event)=>changeHandler(event)}
            value={inputs.countries}
            name="countries"></input>
            {errors.name && (<p style={{color: "red"}} className="error">{errors.name}</p>)}


            <label className={styles.heading}>Season</label>
            <select name="season"
            onClick={(event)=>changeHandler(event)}>
                    <option value=""></option>
                    <option value="winter" >Winter</option>
                    <option value="summer" >Summer</option>
                    <option value="autumn" >Autumn</option>
                    <option value="spring" >Spring</option>
            </select>
                    
                    <button className={styles.button} type="submit">Create</button>
            </form>
    </div>

)
}


export default Form;