const { Router } = require('express');
const { Temperament } = require('../db.js');
const { getAllDogs, getAllDogsByName, getDogByID, getTemperaments, postDog } = require('../controllers/controllers.js');
const { route } = require('./temproutes');

const router = Router();

router.get('/', async(req, res) => {
    const { name } = req.query;
    try {
        getTemperaments();
        if(name){
            const dogsName = await getAllDogsByName(name);
            res.status(200).send(dogsName);
        } else if(!name){
            const allDogs = await getAllDogs();
            res.status(200).send(allDogs);
        };
    } 
    catch (error) {
        res.status(400).json({ error: error.message });
    };
});

router.get('/:id' , async(req, res) => {
    const { id } = req.params;
    try {
        const findDog = await getDogByID(id);
        res.status(200).send(findDog);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
});

router.post('/', async(req, res) => {
    try {
        getTemperaments();
        const { name, image, minWeight, maxWeight, minHeight, maxHeight, temperaments, minLifeSpan, maxLifeSpan } = req.body;
        if(temperaments.length === 0){
            throw new Error('need at least one temperament');
        }
        const newDog = await postDog(name, image, parseInt(minHeight), parseInt(maxHeight), parseInt(minWeight), parseInt(maxWeight), parseInt(minLifeSpan), parseInt(maxLifeSpan));
        const temp = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        await newDog.addTemperament(temp);
        res.status(200).json({ message: `The dog ${newDog.name} was created with the following id ${newDog.id}` })
    } catch (error) {
        res.status(400).json({ error: error.message});
    };
});
module.exports = router;