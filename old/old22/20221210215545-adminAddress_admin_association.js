"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("AdminAddresses", {
            fields: ["AdminId"],
            type: "foreign key",
            name: "userAddress_user_association",
            references: {
                table: "Admins",
                field: "id",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint("AdminAddresses", {
            fields: ["AdminId"],
            type: "foreign key",
            name: "userAddress_user_association",
            references: {
                table: "Admins",
                field: "id",
            },
        });
    },
};
