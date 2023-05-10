require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const temproutes = require('./temproutes');
const dogsroutes = require('./dogsroutes');
// Importar todos los routers;

const router = Router();

// Configurar los routers
router.use('/dogs', dogsroutes);
router.use('/temperaments', temproutes);
// Configurar los routers


module.exports = router;
