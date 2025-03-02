'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    phone_number: DataTypes.NUMBER,
    profile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};