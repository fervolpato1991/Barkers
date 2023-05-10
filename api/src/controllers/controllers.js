const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getDogsApi = async() => {
    try {
        const api = await axios.get(url);
        const allDogs = api.data?.map(dog => {
            return {
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
                from: 'API'
            };
        });
        return allDogs;
    } catch (error) {
        throw new Error(error);
    }
}

const getAllDogs = async() => {
    try {
        const allDogsApi = await getDogsApi();
        const allDogsDB = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        const allDogsDBTemps = allDogsDB.map(dog =>{
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
                from: dog.from
            };
        });
        return [...allDogsApi, ...allDogsDBTemps];
    } catch (error) {
        throw new Error(error);
    };
}
const getAllDogsByName = async(name) => {
    try {
        const allDogs = await getAllDogs();
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
        const allDogs = await getAllDogs();
        const filterName = allDogs.filter(dog => dog.id == id);
        if(filterName.length > 0){
            return filterName[0];
        } else {
            throw new Error('ID dog not found');
        }
    } catch (error) {
        throw new Error(error);
    };
};
const getTemperaments = async() => {
    try {
        const dogsApi = await getDogsApi();
        let arrTemperament = [];
        dogsApi.map(dog => {
            if(dog.temperaments){
                arrTemperament.push(...dog.temperaments.split(', '));
            };
        });
        arrTemperament.map(temperamentName => {
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
        const nameLowerCase = name.toLowerCase();
        const dogName = dogsApiDB.find(dog => dog.name.toLowerCase() === nameLowerCase.trim());

        if(dogName) throw new Error('Dog already exists');

        if(!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !minLifeSpan || !maxLifeSpan){
            throw new Error('All information is required');
        };
        if(name <= 0 || minHeight <= 0 || maxHeight <= 0 || minWeight <= 0 || maxWeight <= 0 || minLifeSpan <= 0 || maxLifeSpan <= 0){
            throw new Error('information cannot be negative')
        }
        if(minWeight >= maxWeight) throw new Error( 'minWeight cannot be equal or greater than maxWeight' );

        if(minWeight >= maxWeight) throw new Error('minWeight cannot be equal or greater than maxWeight');

        if(minHeight >= maxHeight) throw new Error('minHeight cannot be equal or greater than maxHeight');

        if(minLifeSpan >= maxLifeSpan) throw new Error('minLifeSpan cannot be equal or greater than maxLifeSpan')

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