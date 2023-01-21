"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Admins", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            img: {
                type: Sequelize.STRING,
            },
            superAdmin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            operator: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
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
        await queryInterface.dropTable("Admins");
    },
};
