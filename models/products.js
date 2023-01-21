"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Products.hasMany(models.OrderedProducts);
            Products.hasMany(models.ProductImg);
            Products.belongsTo(models.Seller);
            Products.belongsTo(models.Categories);
            Products.belongsTo(models.SubCategories);
        }
    }
    Products.init(
        {
            name: DataTypes.STRING,
            description: {
                type: DataTypes.TEXT,
            },
            welayat: {
                type: DataTypes.STRING,
            },
            etrap: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            lat: {
                type: DataTypes.STRING,
            },
            lang: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.FLOAT,
            },
            currency: {
                type: DataTypes.STRING,
            },
            unit: {
                type: DataTypes.STRING,
            },
            is_sale: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            sale_until: {
                type: DataTypes.DATEONLY,
            },
            sale_price: {
                type: DataTypes.FLOAT,
            },
            price: {
                type: DataTypes.FLOAT,
            },
            status: {
                type: DataTypes.STRING,
            },
            toleg: {
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
            modelName: "Products",
        }
    );
    return Products;
};
