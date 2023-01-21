"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Categories.hasMany(models.Products);
            Categories.hasMany(models.SubCategories);
        }
    }
    Categories.init(
        {
            name_tm: DataTypes.STRING,
            name_ru: {
                type: DataTypes.STRING,
            },
            name_en: {
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
            modelName: "Categories",
        }
    );
    return Categories;
};
