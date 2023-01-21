"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderedProducts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            OrderedProducts.belongsTo(models.Orders);
            OrderedProducts.belongsTo(models.Products);
        }
    }
    OrderedProducts.init(
        {
            price: DataTypes.FLOAT,
            amount: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "OrderedProducts",
        }
    );
    return OrderedProducts;
};
