const { Activity, Country } = require("../db");


// const createActivity = async (name, dificulty, duration, season, countries) => {// Crea una nueva actividad en la BD utilizando el modelo `Activity` y las variables pasadas como argumentos
//     const newActivity = await Activity.create({ name, dificulty, duration, season });
//     for (const countryId of countries) {
//         // Busca un registro de país en la BD que coincida con el identificador "countryId" 
//         const country = await Country.findByPk(countryId);
//         // Agrega el país encontrado a la actividad creada utilizando "addCountry"    
//         await newActivity.addCountry(country);
//         console.log(country);
//     }
//     return newActivity;
// };


const createActivity = async (name, dificulty, duration, season, CountryId) => {

    try {
        const alreadyActivities = await Activity.findOne({
            where: {
                name: name,
            },
        });

        if (!alreadyActivities) {
            const activity = await Activity.create({ name, dificulty, duration, season })
            await activity.addCountry(CountryId)

            let activityWithCountry = await Activity.findOne({
                where: {
                    name: name
                },
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
                include: {
                    model: Country,
                    through: {
                        attributes: []
                    }
                }
            })
            return activityWithCountry
        }
        const activityWithCountry = await alreadyActivities.addCountry(CountryId)

        return activityWithCountry

    } catch (error) {
        throw new Error("Algo salió mal al crear una nueva actividad")
    }
}

// Todas las actividades
const getAllActivitiesControllers = async () => {
    const activities = await Activity.findAll();
    return activities;
};




module.exports = {
    getAllActivitiesControllers,
    createActivity
};
