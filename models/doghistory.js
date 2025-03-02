'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DogHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DogHistory.init({
    breed: DataTypes.STRING,
    color: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    weight: DataTypes.STRING,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DogHistory',
  });
  return DogHistory;
};