require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
const { Dog } = require('../models/Dog');
const { Temperament } = require('../models/Temperament');


const router = Router();

// Configurar los routers
router.get('dogs', async(_req, res) => {
    //Consulta asincrona a la tabla Dog, para buscar todos sus registros y guardarlos en una variable
    //se convierte en un objeto con los datos de la tabla Dog
    //cada objeto representa un registro de dicha tabla y contiene los valores
    //de esa tabla:
    const dogsFromDB = await Dog.findAll();
    //Solicitud asincrona a la api, para obtener la ruta v1/breed(raza), almacena respuesta en variable
    //dogFromApI, o devuelve error 500 si no consigue respuesta.
    const dogsFromAPI = await axios.get('https://api.thedogapi.com/v1/breeds')
    .catch((error) => {
        return res.status(500).send(error);
    });
    //Concatenamos el array que contiene la tabla Dog, con la respuesta de la API,
    //que contiene la raza de los perros.
    //Su fin es tener una lista mas completa y para mostrar info de diferentes fuentes:
    const dogs = await dogsFromDB.concat(dogsFromAPI.data);
    res.send(dogs);
});

router.get('dogs/:idRaza', async(req, res) => {
    const { idRaza } = req.params
    
});

module.exports = router;
