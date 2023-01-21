"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            welayat: {
                type: Sequelize.STRING,
            },
            etrap: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            lat: {
                type: Sequelize.STRING,
            },
            lang: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.FLOAT,
            },
            currency: {
                type: Sequelize.STRING,
            },
            unit: {
                type: Sequelize.STRING,
            },
            is_sale: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            sale_until: {
                type: Sequelize.DATEONLY,
            },
            sale_price: {
                type: Sequelize.FLOAT,
            },
            status: {
                type: Sequelize.STRING,
            },
            toleg: {
                type: Sequelize.STRING,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            SellerId: {
                type: Sequelize.INTEGER,
            },
            CategoryId: {
                type: Sequelize.INTEGER,
            },
            SubCategoryId: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Products");
    },
};
