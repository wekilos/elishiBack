"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("CarrierAddresses", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            welayat: {
                type: Sequelize.STRING,
            },
            etrap: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.TEXT,
            },
            lat: {
                type: Sequelize.STRING,
            },
            lang: {
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
        await queryInterface.dropTable("CarrierAddresses");
    },
};
