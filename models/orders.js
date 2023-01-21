"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Orders.belongsTo(models.User);
            Orders.belongsTo(models.UserAddress);
            Orders.belongsTo(models.Seller);
            Orders.belongsTo(models.SellerAddress);
            Orders.belongsTo(models.Carrier);
            Orders.hasMany(models.OrderedProducts);
        }
    }
    Orders.init(
        {
            status: DataTypes.STRING,
            carrier_status: {
                type: DataTypes.STRING,
            },
            carrier_price: {
                type: DataTypes.FLOAT,
            },
            carrier_take: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            modelName: "Orders",
        }
    );
    return Orders;
};
