"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("UserAddresses", {
            fields: ["UserId"],
            type: "foreign key",
            name: "userAddress_user_association",
            references: {
                table: "Users",
                field: "id",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint("UserAddresses", {
            fields: ["UserId"],
            type: "foreign key",
            name: "userAddress_user_association",
            references: {
                table: "Users",
                field: "id",
            },
        });
    },
};
