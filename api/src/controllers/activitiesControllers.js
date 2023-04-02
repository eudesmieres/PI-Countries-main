const { Activity, Country } = require("../db");


const createActivity = async (name, dificulty, duration, season, countries) => {// Crea una nueva actividad en la BD utilizando el modelo `Activity` y las variables pasadas como argumentos
    const newActivity = await Activity.create({ name, dificulty, duration, season });
    for (const countryId of countries) {
        // Busca un registro de país en la BD que coincida con el identificador "countryId" 
        const country = await Country.findByPk(countryId);
        // Agrega el país encontrado a la actividad creada utilizando "addCountry"    
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
