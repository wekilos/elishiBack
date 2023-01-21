"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Seller extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Seller.hasMany(models.SellerAddress);
            Seller.hasMany(models.Orders);
            Seller.hasMany(models.Products);
        }
    }
    Seller.init(
        {
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.BIGINT,
            },
            password: {
                type: DataTypes.STRING,
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
            modelName: "Seller",
        }
    );
    return Seller;
};
