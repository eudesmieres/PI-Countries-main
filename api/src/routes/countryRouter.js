const { Router } = require('express');
const { getCountryHandlers, getCountryIdHandlers } = require('../handlers/countryHandlers');

const countryRouter = Router();

// RUTA http://localhost:3000/countries/
//vienen de index.js/routes y van a handlers
countryRouter.get('/', getCountryHandlers);

countryRouter.get('/:id', getCountryIdHandlers);


module.exports = countryRouter;