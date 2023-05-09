require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
const { Dog } = require('../models/Dog');
const { Temperament } = require('../models/Temperament');
const { API_KEY } = process.env;


const router = Router();

// Configurar los routers
const api = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
