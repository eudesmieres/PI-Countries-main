const { Router } = require('express');
const { createActivitiesHandlers, getActivitiesHandlers } = require('../handlers/activitiesHandlers');

const activitiesRouter = Router();


//vienen de index.js/routes y van a handlers
activitiesRouter.post('/', createActivitiesHandlers);

activitiesRouter.get('/', getActivitiesHandlers);


module.exports = activitiesRouter;