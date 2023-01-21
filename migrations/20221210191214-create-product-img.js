"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ProductImgs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            img: {
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
            ProductId: {
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
        await queryInterface.dropTable("ProductImgs");
    },
};
