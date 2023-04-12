const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require('../routes/countryRouter');
const activitiesRouter = require('../routes/activitiesRouter');

const router = Router();

// RUTA http://localhost:3000/countries
// RUTA http://localhost:3000/activities
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countryRouter);
router.use('/activities', activitiesRouter);
//Estas rutas vienen de app.js y van a routes

module.exports = router;
