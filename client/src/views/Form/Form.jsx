import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActivities } from "../../components/redux/actions";


// "name", "dificulty", "duration", "season"
export const validate = ({ name, dificulty, duration, season, countryId }) => {
    const errors = {};
    errors.name = name === "" ? "Need a name" : errors.name;
    errors.dificulty = dificulty > 0 || dificulty <= 5 ? errors.dificulty : "Only between 1 and 5";
    errors.duration = isNaN(duration) || duration <= 0 ? "Activity duration is invalid" : errors.duration;
    //errors.duration = typeof (duration) != "number" ? "Activity duration" : errors.duration;
    errors.season = !season ? "A season is required" : errors.season;
    errors.countryId = countryId.length < 3 ? "Country without 3 letters" : errors.countryId;
    
    return errors;
}

const Form = () => {
    const dispatch = useDispatch();
    const lettersId = useSelector(state => state.lettersId)

    const history = useHistory();
    const [inputs, setInputs] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countryId: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countryId: ""
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
        console.log(inputs);
        dispatch(postActivities(inputs))
         //axios.post("http://localhost:3001/activities", inputs)
         alert("Actividad Creada")
         setInputs({
            name: "",
        dificulty: "",
        duration: "",
        season: "",
        countryId: ""
         })
         history.push("/home")
         
    }

const handlerselect = (event)=>{
    const property = event.target.name
    const value = event.target.value

    setErrors(validate({ ...inputs, [property]: value }))
    setInputs({ ...inputs, [property]: value })
}

        return (

            <div>
                <h1>ESTO ES  EL FORMULARIO</h1>
                <form onSubmit={(event)=>submitHandler(event)} >

                    <label>Name:</label>
                    <input type="text" onChange={(event)=>changeHandler(event)} value={inputs.name} name="name"></input>
                    <label>Dificulty:</label>
                    <input type="number" onChange={(event)=>changeHandler(event)} value={inputs.dificulty} name="dificulty"></input>
                    <label>Duration:</label>
                    <input type="time" onChange={(event)=>changeHandler(event)} value={inputs.duration} name="duration"></input>
                    {/* <label>Country:</label>
                    <select>
                        {lettersId?.map((occ) => {
                    console.log(occ);
                          
                           <option value={occ.name}>{occ.name}</option>
                              })}
                    </select> */}
                    <label>Country:</label>
                    <input type="text" onChange={(event)=>changeHandler(event)} value={inputs.countryId} name="countryId"></input>
                    <label>Season</label>
                    <select >
                        <option value=""></option>
                        <option value="winter" onChange={(event)=>changeHandler(event)}>Winter</option>
                        <option value="summer" onChange={(event)=>changeHandler(event)}>Summer</option>
                        <option value="autumn" onChange={(event)=>changeHandler(event)}>Autumn</option>
                        <option value="spring" onChange={(event)=>changeHandler(event)}>Spring</option>
                    </select>
                    

                    <button type="submit">Create</button>
                </form>
            </div>

        )
    }


export default Form;