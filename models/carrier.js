"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Carrier extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Carrier.hasMany(models.CarrierAddress);
            Carrier.hasMany(models.CarrierPhones);
            Carrier.hasMany(models.CarrierPrices);
            Carrier.hasMany(models.Orders);
        }
    }
    Carrier.init(
        {
            name: DataTypes.STRING,
            companyName: {
                type: DataTypes.STRING,
            },
            password: DataTypes.STRING,
            phone: {
                type: DataTypes.BIGINT,
            },
            img: {
                type: DataTypes.STRING,
            },
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
            modelName: "Carrier",
        }
    );
    return Carrier;
};
