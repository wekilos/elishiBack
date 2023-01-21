"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CarrierAddress extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CarrierAddress.belongsTo(models.Carrier);
        }
    }
    CarrierAddress.init(
        {
            welayat: DataTypes.STRING,
            etrap: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.TEXT,
            },
            lat: {
                type: DataTypes.STRING,
            },
            lang: {
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
            modelName: "CarrierAddress",
        }
    );
    return CarrierAddress;
};
