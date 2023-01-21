"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CarrierPhones extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CarrierPhones.belongsTo(models.Carrier);
        }
    }
    CarrierPhones.init(
        {
            phone: DataTypes.STRING,
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "CarrierPhones",
        }
    );
    return CarrierPhones;
};
