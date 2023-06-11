const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getDogsApi = async() => {
    try {
        const api = await axios.get(url);
        // Se realiza el mapeo y formateo de los datos de la API externa:
        const allDogs = api.data?.map(dog => {
            return {
                // Dentro del mapeo, se crea un objeto para cada raza de perro,
                // utilizando diferentes propiedades de la respuesta de la API:
                id: dog.id,
                name: dog.name,
                temperaments: dog.temperament,
                image: dog.image.url,
                minHeight: parseInt(dog.height.metric.split("-")[0]),
                maxHeight: parseInt(dog.height.metric.split("-")[1]),
                minWeight: parseInt(dog.weight.metric.split("-")[0]),
                maxWeight: parseInt(dog.weight.metric.split("-")[1]),
                minLifeSpan: parseInt(dog.life_span.split("-")[0]),
                maxLifeSpan: parseInt(dog.life_span.split("-")[1]),
            };
        });
        return allDogs;
    } catch (error) {
        throw new Error(error);
    }
}

const getAllDogs = async() => {
    try {
        // utiliza getDogsApi para obtener los perros desde la API externa
        // y luego obtiene todos los perros de la base de datos, 
        //incluyendo los temperamentos asociados.:
        const allDogsApi = await getDogsApi();
        const allDogsDB = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    // se utiliza through con attributes: [] para evitar la inclusión
                    // de información adicional sobre la relación entre los modelos Dog y Temperament.
                    attributes: []
                }
            }
        });
        const allDogsDBTemps = allDogsDB.map(dog =>{
            // Para cada perro en allDogsDB, se crea un objeto con las propiedades deseadas.
    
            return {
                id: dog.id,
                name: dog.name,
                temperaments: dog.temperaments.map(temp => temp.name).join(', '),
                image: dog.image,
                minHeight: dog.minHeight,
                maxHeight: dog.maxHeight,
                minWeight: dog.minWeight,
                maxWeight: dog.maxWeight,
                minLifeSpan: dog.minLifeSpan,
                maxLifeSpan: dog.maxLifeSpan,
                db: dog.db
            };
            // la idea es transformar los perros obtenidos de la base de datos local
            // en un formato consistente con los perros obtenidos de la API externa, 
            // lo que permite combinar y presentar de manera uniforme la información 
            // de ambos orígenes.
        });
        return [...allDogsApi, ...allDogsDBTemps];
    } catch (error) {
        throw new Error(error);
    };
}
const getAllDogsByName = async(name) => {
    try {
        // utiliza getDogsApi para obtener los perros desde la API externa:
        const allDogs = await getAllDogs();
        // Luego, se filtra la lista de los perros por nombre,
        // según el parámetro name proporcionado:
        const filterName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        if(filterName.length > 0){
            return filterName;
        } throw new Error('Dog not found')
    } catch (error) {
        throw Error(error);
    }
}

const getDogByID = async(id) => {
    try {
        // utiliza getAllDogs para obtener todos los perros:
        const allDogs = await getAllDogs();
        // filtra los perros por ID, según el parámetro id proporcionado:
        const filterName = allDogs.filter(dog => dog.id == id);
        // Si se encuentra un perro con el ID correspondiente, se devuelve:
        if(filterName.length > 0){
            return filterName[0];
        } else {
        // De lo contrario, se lanza un error:
            throw new Error('ID dog not found');
        }
    } catch (error) {
        throw new Error(error);
    };
};
const getTemperaments = async() => {
    try {
        // utiliza getDogsApi para obtener los perros desde la API externa:
        const dogsApi = await getDogsApi();
        // declara un arreglo vacío:
        let arrTemperament = [];
        // iterar sobre los perros obtenidos de la API (dogsApi):
        dogsApi.map(dog => {
        // Dentro de cada iteración, 
        // se verifica si el perro tiene temperamentos (dog.temperaments):
            if(dog.temperaments){
                // Los temperamentos separados se agregan al arreglo arrTemperament
                arrTemperament.push(...dog.temperaments.split(', '));
            };
        });
        // Después de mapear todos los perros de la API y
        // agregar los temperamentos al arreglo arrTemperament, 
        // se realiza otro map en el arreglo arrTemperament:
        arrTemperament.map(temperamentName => {
            // En cada iteración, se utiliza el modelo Temperament
            // para buscar o crear una instancia de temperamento en la base de datos,
            // utilizando el nombre del temperamento obtenido (temperamentName) 
            // como condición de búsqueda o creación:
            Temperament.findOrCreate({
                where: {
                    name: temperamentName,
                }
            });
        });
    } catch (error) {
        throw new Error(error);
    };
};
const postDog = async(name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan) => {
    try {
        const dogsApiDB = await getAllDogs();
        // El nombre del perro que se va a crear se convierte a 
        // minúsculas y se elimina cualquier espacio en blanco 
        // adicional utilizando name.toLowerCase() y nameLowerCase.trim(), respectivamente:
        const nameLowerCase = name.toLowerCase();
        // Se busca en el arreglo dogsApiDB si existe algún perro
        // cuyo nombre coincida con el nombre proporcionado:
        const dogName = dogsApiDB.find(dog => dog.name.toLowerCase() === nameLowerCase.trim());
        if(dogName) throw new Error('Dog already exists');
        if(!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !minLifeSpan || !maxLifeSpan){
            throw new Error('All information is required');
        };
        if(name <= 0 || minHeight <= 0 || maxHeight <= 0 || minWeight <= 0 || maxWeight <= 0 || minLifeSpan <= 0 || maxLifeSpan <= 0){
            throw new Error('information cannot be negative')
        };
        if(minWeight >= maxWeight) throw new Error( 'minWeight cannot be equal or greater than maxWeight' );

        if(minWeight >= maxWeight) throw new Error('minWeight cannot be equal or greater than maxWeight');

        if(minHeight >= maxHeight) throw new Error('minHeight cannot be equal or greater than maxHeight');

        if(minLifeSpan >= maxLifeSpan) throw new Error('minLifeSpan cannot be equal or greater than maxLifeSpan');

        const newDog = await Dog.create({
            name,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLifeSpan,
            maxLifeSpan,
            from: "DataBase"
        });
        return newDog
    }
    catch (error) {
        throw new Error(error);
    }
}

const deleteDog = async(id) => {
    try {
        const deleteDog = await Dog.destroy({
            // se invoca con un objeto que tiene una propiedad where
            // que especifica la condición de búsqueda del perro a eliminar
            // se busca un perro cuyo ID sea igual al ID proporcionado como parámetro:
            where: {
                id,
            }
        });
        return deleteDog
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getDogsApi,
    getAllDogs,
    getAllDogsByName,
    getDogByID,
    getTemperaments,
    postDog,
    deleteDog
}