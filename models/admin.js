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
            // define association here
            this.hasMany(AdminAddress);
        }
    }
    Admin.init(
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
            superAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            operator: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
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
            modelName: "Admin",
        }
    );
    return Admin;
};
