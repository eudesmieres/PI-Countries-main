const { Router } = require('express');
const { createActivitiesHandlers, getActivitiesHandlers } = require('../handlers/activitiesHandlers');

const activitiesRouter = Router();

// const validate = (req, res, next) => {
//     const { name, dificulty, duration, season } = req.body;
//     if(!name) return res.status(400).json({ error: "Missing name"});
//     if(!dificulty) return res.status(400).json({ error: "Missing dificulty"});
//     if(!duration) return res.status(400).json({ error: "Missing duration"});
//     if(!season) return res.status(400).json({ error: "Missing season"});

//     next();
// }


//vienen de index.js/routes y van a handlers
activitiesRouter.post('/', createActivitiesHandlers);

activitiesRouter.get('/', getActivitiesHandlers);


module.exports = activitiesRouter;