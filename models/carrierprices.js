"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CarrierPrices extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CarrierPrices.belongsTo(models.Carrier);
        }
    }
    CarrierPrices.init(
        {
            price: DataTypes.FLOAT,
            description: {
                type: DataTypes.TEXT,
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
            modelName: "CarrierPrices",
        }
    );
    return CarrierPrices;
};
