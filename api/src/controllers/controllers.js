// Estas líneas importan las dependencias necesarias, 
// incluido Axios para hacer solicitudes HTTP y 
// los modelos Dog y Temperament definidos en otro archivo (db.js).
// Además, obtiene la clave de la API desde las variables de entorno 
// y construye la URL para la API externa de perros:
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getDogsApi = async() => {
    try {
        // Llama a la API externa de perros y obtiene la respuesta:
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
                // extrae los de una raza de perro en la API,
                // convirtiéndolo de una cadena a un número entero.
                // Esto se logra mediante la división de las strings de las propiedades
                // en dos partes y la conversión del primer elemento del arreglo
                // resultante en un número entero
                // luego se hace lo mismo con el segundo:
                minHeight: parseInt(dog.height.metric.split("-")[0]),
                maxHeight: parseInt(dog.height.metric.split("-")[1]),
                minWeight: parseInt(dog.weight.metric.split("-")[0]),
                maxWeight: parseInt(dog.weight.metric.split("-")[1]),
                minLifeSpan: parseInt(dog.life_span.split("-")[0]),
                maxLifeSpan: parseInt(dog.life_span.split("-")[1]),
            };
        });
        // Todos los objetos de raza de perro se agregan a un arreglo llamado allDogs,
        // se devuelve el arreglo allDogs que contiene los datos formateados de la API externa:
        return allDogs;
    } catch (error) {
        // Si ocurre algún error durante la llamada a la API o el proceso de formateo,
        // se captura la excepción en el bloque catch y se lanza un nuevo error
        // con el mensaje de error original:
        throw new Error(error);
    }
}

const getAllDogs = async() => {
    try {
        // utiliza getDogsApi para obtener los perros desde la API externa
        // y luego obtiene todos los perros de la base de datos, 
        //incluyendo los temperamentos asociados.:
        const allDogsApi = await getDogsApi();
        // Se utiliza el modelo Dog definido en la base de datos local
        // para buscar todos los perros almacenados en la base de datos.
        // La función findAll() se utiliza para realizar la consulta a la base de datos:
        const allDogsDB = await Dog.findAll({
            // se utiliza la opción include para incluir información adicional
            // de los temperamentos asociados a cada perro.
            include: {
                // Esto se logra especificando el modelo Temperament en el objeto de inclusión.
                model: Temperament,
                // También se especifica que solo se necesitan los atributos name del modelo Temperament 
                attributes: ['name'],
                through: {
                    // se utiliza through con attributes: [] para evitar la inclusión
                    // de información adicional sobre la relación entre los modelos Dog y Temperament.
                    attributes: []
                }
            }
        });
        // Luego, se realiza un mapeo y formateo de los datos tanto de la API
        // como de la base de datos:
        console.log(allDogsDB);
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
        // Finalmente, se devuelve una combinación de los perros de la API y los de la base de datos
        // En un nuevo array se desestructuran los arrays para poder tener una lista completa y combinada de perros
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
        // y luego se devuelve la lista de perros encontrados:
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
                // Si el perro tiene temperamentos, se realiza lo siguiente:
                // Los temperamentos se dividen por coma y espacio usando split(', ').
                // Los temperamentos separados se agregan al arreglo arrTemperament
                // utilizando el operador de propagación (...):
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
        // Se obtienen todos los perros existentes en la base de datos 
        // utilizando la función getAllDogs y se almacenan en la variable dogsApiDB:
        const dogsApiDB = await getAllDogs();
        // El nombre del perro que se va a crear se convierte a 
        // minúsculas y se elimina cualquier espacio en blanco 
        // adicional utilizando name.toLowerCase() y nameLowerCase.trim(), respectivamente:
        const nameLowerCase = name.toLowerCase();
        // Se busca en el arreglo dogsApiDB si existe algún perro
        // cuyo nombre coincida con el nombre proporcionado:
        const dogName = dogsApiDB.find(dog => dog.name.toLowerCase() === nameLowerCase.trim());
        // Si se encuentra un perro con el mismo nombre, 
        // se lanza un error con el mensaje "Dog already exists":
        if(dogName) throw new Error('Dog already exists');
        // Se realizan varias validaciones para asegurarse de que todos los campos requerido,
        // se proporcionen y sean válidos.
        // Si alguno de los campos requeridos falta o tiene un valor no válido,
        // se lanza un error correspondiente: 
        if(!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !minLifeSpan || !maxLifeSpan){
            throw new Error('All information is required');
        };
        if(name <= 0 || minHeight <= 0 || maxHeight <= 0 || minWeight <= 0 || maxWeight <= 0 || minLifeSpan <= 0 || maxLifeSpan <= 0){
            throw new Error('information cannot be negative')
        };
        // Se realizan validaciones para comprobar que los campos minimos requeridos
        // no sean de un valor mayor que el valor de los campos maximos:
        if(minWeight >= maxWeight) throw new Error( 'minWeight cannot be equal or greater than maxWeight' );

        if(minWeight >= maxWeight) throw new Error('minWeight cannot be equal or greater than maxWeight');

        if(minHeight >= maxHeight) throw new Error('minHeight cannot be equal or greater than maxHeight');

        if(minLifeSpan >= maxLifeSpan) throw new Error('minLifeSpan cannot be equal or greater than maxLifeSpan')

        // Si todas las validaciones pasan, se crea un nuevo perro en la base de datos
        // utilizando el modelo Dog y los valores proporcionados. 
        // El perro se crea con el campo from establecido como "DataBase":
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
        // Se devuelve el perro recién creado:
        return newDog
    }
    catch (error) {
        // En caso de que ocurra algún error durante el proceso, 
        // se captura y se lanza un nuevo error con el mensaje de error correspondiente:
        throw new Error(error);
    }
}

const deleteDog = async(id) => {
    // La función toma un parámetro id que representa el ID del perro que se desea eliminar:
    try {
        // se utiliza el método destroy proporcionado
        // por el modelo Dog para buscar y eliminar el perro
        // correspondiente en la base de datos:
        const deleteDog = await Dog.destroy({
            // se invoca con un objeto que tiene una propiedad where
            // que especifica la condición de búsqueda del perro a eliminar
            // se busca un perro cuyo ID sea igual al ID proporcionado como parámetro:
            where: {
                id,
            }
            // El método destroy devuelve un valor que indica el número
            // de filas afectadas por la operación de eliminación.
            // En este caso, se almacena en una variable llamada deleteDog.
        });
        // Se devuelve el valor de deleteDog, que representa el número de filas eliminadas:
        return deleteDog
    } catch (error) {
        // Si ocurre algún error durante el proceso de eliminación, 
        // se captura en el bloque catch y se lanza un nuevo error
        // con el mensaje de error correspondiente:
        throw new Error(error);
    }
}

// Finalmente, se exportan todas las funciones
module.exports = {
    getDogsApi,
    getAllDogs,
    getAllDogsByName,
    getDogByID,
    getTemperaments,
    postDog,
    deleteDog
}