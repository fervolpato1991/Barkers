const { Router } = require('express');
const { getTemperaments } = require('../controllers/controllers.js');
const { Temperament } = require('../db.js');

const router = Router();

router.get('/', async(req, res) => {
    try {
        // se llama a la función getTemperaments()
        // para obtener los temperamentos desde una fuente externa:
        await getTemperaments();
        // luego busca en la BD los temperamentos y los devuelve:
        const allTemperaments = await Temperament.findAll();
        // y los devuelve en formato json:
        res.status(200).json(allTemperaments);
    } catch (error) {
        // Si ocurre un error, se envia respues con mensaje json que contiene el error:
        res.status(400).json({error: error.message});
    }
})

module.exports = router;