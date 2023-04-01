const { Router } = require('express');
const { getCountryHandlers, getCountryIdHandlers } = require('../handlers/countryHandlers');

const countryRouter = Router();

//vienen de index.js/routes y van a handlers
countryRouter.get('/', getCountryHandlers);

countryRouter.get('/:id', getCountryIdHandlers);


module.exports = countryRouter;