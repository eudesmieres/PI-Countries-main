// import { useState } from "react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, postActivities } from "../../components/redux/actions";
import Style from "../Form/Form.module.css";


const Form = () => {

    const countries = useSelector(state => state.countries).sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

    const [form, setForm] = useState({
        name: "",
        dificulty: 0,
        duration: "",
        CountryId: [],
        season: "",
    })

    const [error, setError] = useState({})
    const [activities, setActivities] = useState([]);


    const changeInputHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value

        setForm({ ...form, [property]: value })
        validator({ ...form, [property]: value })
    }

    const [names, setNames] = useState([])

    const selectCountryHandler = (event) => {
        const countryMatch = countries.find(item => item.id === event);
        setNames([...names, countryMatch]);

        setForm({
            ...form,
            CountryId: [...form.CountryId, event]
        })
        validator({
            ...form,
            CountryId: [...form.CountryId, event]
        })

    }

    const selectDifficultyHandler = (event) => {
        setForm({
            ...form,
            dificulty: Number(event.target.value)
        })
        validator({
            ...form,
            dificulty: Number(event.target.value)
        })
    }

    const selectDurationHandler = (event) => {
        setForm({
            ...form,
            duration: event.target.value
        })
        validator({
            ...form,
            duration: event.target.value
        })
    }

    const selectSeasonHandler = (event) => {
        setForm({
            ...form,
            season: event.target.value
        })
        validator({
            ...form,
            season: event.target.value
        })
    }

    const handlerSubmit = (e) => {
        // e.preventDefault();
        try {
            // Validar duración
      const validDuration = /^(0[1-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(form.duration);
      if (!validDuration) {
        alert('Duration is invalid. Please enter a valid time (hh:mm)');
        return;
      }

       // Validar nombre
    const validName = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.name);
    if (!validName) {
      alert('Name is invalid. Please enter a valid name (only letters and spaces)');
      return;
    }
           dispatch(postActivities(form))
            alert(`You have been created the new activity ${form.name}`)
            setForm({
                name: "",
                dificulty: null,
                duration: "",
                CountryId: [],
                season: "",
            });
            history.push("/home");
            
        } catch (error) {
            if (error.response && error.response.status === 400) {
            alert("Error400: No se pudo crear la actividad. Verifica los datos ingresados.");
            } else {
            console.log(error);
            alert("Error: Hubo un problema al crear la actividad. Intente de nuevo más tarde.");
            }
        }

    }

    const dificultySelect = [1, 2, 3, 4, 5]


    useEffect(() => {
        setError(validator(form))
    }, [form])

    const validator = (form) => {
        let errors = {}
        if (!form.name) {
            errors.name = 'Name is required'
        }
        if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.name)) {
            errors.name = 'Name is invalid'
        }
        if (!form.duration || !/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(form.duration)) {
            errors.duration = 'Duration is invalid'
        }
        if (!form.dificulty) {
            errors.dificulty = 'Difficulty is required'
        }
        if (!form.season) {
            errors.season = 'You must select one season'
        }
        if (!form.CountryId.length) {
            errors.CountryId = 'You must select at least one country'
        }
        return errors
    }

    const filteredCountriesForMap = countries.filter((country) => !form.CountryId.includes(country.id))

    return (

        <form className={Style.container}
        onSubmit={handlerSubmit}>
            <div>
                <div className={Style.header}>
                    <span>CREATE ACTIVITY</span>
                </div>
                <div >
                    <span className={Style.inputs}>ACTIVITY NAME</span>
                    <input
                        placeholder={error.name && "NAME IS REQUIRED"} type="text" value={form.name} onChange={changeInputHandler} name="name"
                        autoComplete="on"
                        className={Style.box}>
                    </input>
                    {error.name === 'Name is invalid' && <span className={Style.Error}>NAME IS INVALID</span>}
                </div>
                <span className={Style.input}>DIFFICULTY</span>
                <div>
                    <select className={Style.box} onChange={selectDifficultyHandler}>
                        <option value="" hidden>{error.dificulty && "DIFFICULTY IS REQUIRED"}</option>
                        {dificultySelect.map(item => <option key={item} name="difficulty" value={item}>{item}</option>)}
                    </select>
                </div>
                <span className={Style.input}>DURATION</span>
                <div>
                <input
                placeholder={error.duration && "DURATION IS REQUIRED"} type="time" value={form.duration} onChange={selectDurationHandler} name="duration"
                className={Style.box}>
                </input>
                {error.duration === 'duration is invalid' && <span className={Style.Error}>DURATION IS INVALID</span>}
                 

                </div>
                <span className={Style.inputs}>COUNTRY</span>
                <div>
                    <select className={Style.box} onChange={(e) => selectCountryHandler(e.target.value)}>
                        <option value="" hidden>{error.CountryId ? "COUNTRY IS REQUIRED" : "SELECT COUNTRY"}</option>
                        {filteredCountriesForMap?.map(item => <option key={item.id} value={item.id}>{item.name.toUpperCase()}</option>)}
                    </select>
                </div>
                <span className={Style.inputs}>SEASON</span>
                <div>
                    <select className={Style.box} onChange={selectSeasonHandler}>
                        <option value="" hidden>{error.season && "SEASON IS REQUIRED"}</option>
                        <option name="SUMMER" value="SUMMER">SUMMER</option>
                        <option name="autumn" value="autumn">autumn</option>
                        <option name="WINTER" value="WINTER">WINTER</option>
                        <option name="SPRING" value="SPRING">SPRING</option>
                    </select>
                    <div className={Style.buttonContainer}>
                    {Object.entries(error).length === 0 && <button className={Style.button} type="submit">ADD ACTIVITY</button>}
                    {activities.length === 0 ? (
        <p className={Style.Error}>No hay ninguna actividad creada.</p>) : (
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      )}
            </div>
          </div>
        </div>
    </form>
    )

};

export default Form;