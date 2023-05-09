const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    image:{
      type: DataTypes.JSONB,
      allowNull: false
    },
    height:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lifeSpan:{
      type: DataTypes.STRING,
      allowNull: false
    }
  },{ timestamps: false });
};
