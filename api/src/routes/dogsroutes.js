const { Router } = require('express');
const { Temperament } = require('../db.js');
const { getAllDogs, getAllDogsByName, getDogByID, getTemperaments, postDog, deleteDog} = require('../controllers/controllers.js');
const { route } = require('./temproutes');

const router = Router();

router.get('/', async(req, res) => {
    const { name } = req.query;
    try {
        getTemperaments();
        // Si hay un parámetro de consulta name en la solicitud,
        //  se llama a la función getAllDogsByName(name) y se devuelve el resultado.:
        if(name){
            const dogsName = await getAllDogsByName(name);
            res.status(200).send(dogsName);
        //Si no hay un parámetro name, se llama a la función getAllDogs()
        // y se devuelve el resultado:
        } else if(!name){
            const allDogs = await getAllDogs();
            res.status(200).send(allDogs);
        };
    } // Si ocurre un error en el try,
      // se captura en el catch block y 
      // se envía una respuesta de estado 400 con un objeto JSON 
      // que contiene el mensaje de error:
    catch (error) {
        res.status(400).json({ error: error.message });
    };
});

router.get('/:id' , async(req, res) => {
    const { id } = req.params;
    try {
        // se llama a la función asincrónica
        // getDogByID(id) con el ID proporcionado y se devuelve el resultado. 
        const findDog = await getDogByID(id);
        res.status(200).send(findDog);
    } catch (error) {
        // Si ocurre un error, 
        // se captura en el catch block y se 
        //envía una respuesta de estado 400 con un objeto JSON que contiene el mensaje de error.
        res.status(400).json({error: error.message});
    };
});

router.post('/', async(req, res) => {
    try {
        getTemperaments();
        //Los datos de la solicitud se extraen del cuerpo (req.body) y se realiza una validación:
        const { name, image, minWeight, maxWeight, minHeight, maxHeight, temperaments, minLifeSpan, maxLifeSpan } = req.body;
        //Si no se proporciona ningún temperamento en el campo temperaments, se lanza un error:
        if(temperaments.length === 0){
            throw new Error('need at least one temperament');
        }
        // Luego se llama a la función postDog() con los datos recibidos
        // y se crea un nuevo perro en la base de datos:
        const newDog = await postDog(name, image, parseInt(minHeight), parseInt(maxHeight), parseInt(minWeight), parseInt(maxWeight), parseInt(minLifeSpan), parseInt(maxLifeSpan));
        //A continuación, se buscan los objetos de temperamento 
        //correspondientes a los nombres proporcionados y se asocian al nuevo perro: 
        const temp = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        // Luego se guardan los nuevos datos en la base de datos:
        await newDog.addTemperament(temp);
        // Luego se devuelve la respuesta en formato JSON:
        res.status(200).json({ message: `The dog ${newDog.name} was created with the following id ${newDog.id}` })
    } catch (error) {
        // Si ocurre un error, se captura en el catch block y se muestra el mensaje:
        res.status(400).json({ error: error.message});
    };
});

router.delete('/:id', async(req, res) => {
   try {
    const { id } = req.params;
    // Se busca el perro en la base de datos y se elimina:
    const delDog = await deleteDog(id)
    // Luego se devuelve la respuesta en formato JSON:
    res.status(200).json({ message: 'Dog removed'});
   } 
   catch (error) {
    // Si ocurre un error, se captura en el catch block y se muestra el mensaje:
    res.status(400).json({ error: error.message});
   } 
})

module.exports = router;