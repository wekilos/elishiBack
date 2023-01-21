"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ UserAddress }) {
            this.hasMany(UserAddress);
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            phone: DataTypes.BIGINT,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            img: DataTypes.STRING,
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
            modelName: "User",
        }
    );
    return User;
};
