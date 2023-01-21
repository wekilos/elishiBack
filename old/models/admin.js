"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ AdminAddress }) {
            this.hasMany(AdminAddress, {
                foreignKey: "AdminId",
                as: "Admin",
            });
        }
    }
    Admin.init(
        {
            name: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            img: {
                type: DataTypes.STRING,
            },
            superAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            operator: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            sequelize,
            modelName: "Admin",
        }
    );
    return Admin;
};
