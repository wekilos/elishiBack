'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCodes.init({
    phone: DataTypes.BIGINT,
    email: DataTypes.STRING,
    code: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCodes',
  });
  return UserCodes;
};