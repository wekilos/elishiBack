"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         *  */
        await queryInterface.createTable("UserAddress", {
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
        /**
         * Add reverting commands here.
         *
         * Example:
         */
        await queryInterface.dropTable("UserAddress");
    },
};
