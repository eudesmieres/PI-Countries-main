const { Activity, Country } = require("../db");


const createActivity = async (name, dificulty, duration, season, countries) => {// Crea una nueva actividad en la base de datos utilizando el modelo `Activity` y las variables pasadas como argumentos

    const newActivity = await Activity.create({ name, dificulty, duration, season });
    for (const countryId of countries) {
        const country = await Country.findByPk(countryId);
        await newActivity.addCountry(country);
    }
    return newActivity;
};


const getAllActivitiesControllers = async () => {
    const activities = await Activity.findAll();
    return activities;
};




module.exports = {
    getAllActivitiesControllers,
    createActivity
};
