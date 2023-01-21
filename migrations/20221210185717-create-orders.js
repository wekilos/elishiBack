"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.STRING,
            },
            carrier_status: {
                type: Sequelize.STRING,
            },
            carrier_price: {
                type: Sequelize.FLOAT,
            },
            carrier_take: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            UserId: {
                type: Sequelize.INTEGER,
            },
            UserAddressId: {
                type: Sequelize.INTEGER,
            },
            SellerId: {
                type: Sequelize.INTEGER,
            },
            SellerAddressId: {
                type: Sequelize.INTEGER,
            },
            CarrierId: {
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
        await queryInterface.dropTable("Orders");
    },
};
