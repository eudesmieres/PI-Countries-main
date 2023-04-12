const { createActivity, getAllActivitiesControllers } = require('../controllers/activitiesControllers');

//Viene de Handlers y va a Controllers
const createActivitiesHandlers = async (req, res) => {
    //
    const { name, dificulty, duration, season, countries } = req.body;
    console.log(name, dificulty, duration, season, countries);
    try {
        //Llama a la funcion del controllers "createActivity"    
        const newActivity = await createActivity(name, dificulty, duration, season, countries);

        res.status(200).json(newActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getActivitiesHandlers = async (req, res) => {
    try {
        const result = await getAllActivitiesControllers();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    createActivitiesHandlers,
    getActivitiesHandlers
}