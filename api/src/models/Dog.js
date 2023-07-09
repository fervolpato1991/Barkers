const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    image:{
      type: DataTypes.JSONB,
      allowNull: false
    },
    minHeight:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxHeight:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minWeight:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxWeight:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minLifeSpan:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxLifeSpan:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    db: {
      type: DataTypes.BOOLEAN,
      defaultValue : true
    }
  },{ timestamps: false });
};
