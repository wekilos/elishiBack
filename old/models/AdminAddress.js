"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AdminAddress extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Admin }) {
            this.belongsTo(Admin, {
                foreignKey: "AdminId",
                as: "AdminAdress",
            });
        }
    }
    AdminAddress.init(
        {
            welayat: {
                type: DataTypes.STRING,
            },
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
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "AdminAddress",
        }
    );
    return AdminAddress;
};
