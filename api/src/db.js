require('dotenv').config();
const { Sequelize } = require('sequelize');
// Se importan los módulos fs y path.
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize = new Sequelize(`postgres://fervolpato1991:7lq2NdddFm16JAYyyLH8yXY7wjy12JmQ@dpg-cipenotgkuvrtodc8gv0-a/pidogs_yk6b`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, { through: 'DogTemperament', timestamps: null});
Temperament.belongsToMany(Dog, { through: 'DogTemperament', timestamps: null});

module.exports = {
  ...sequelize.models, 
  conn: sequelize,   
};
