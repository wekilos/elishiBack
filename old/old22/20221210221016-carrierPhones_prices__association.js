"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("CarrierPrices", {
            fields: ["CarrierId"],
            type: "foreign key",
            name: "CarrierPrices_association",
            references: {
                table: "Carriers",
                field: "id",
            },
        });
        await queryInterface.addConstraint("CarrierPhones", {
            fields: ["CarrierId"],
            type: "foreign key",
            name: "CarrierPhones_association",
            references: {
                table: "Carriers",
                field: "id",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint("CarrierPrices", {
            fields: ["CarrierId"],
            type: "foreign key",
            name: "CarrierPrices_association",
            references: {
                table: "Carriers",
                field: "id",
            },
        });
        await queryInterface.removeConstraint("CarrierPhones", {
            fields: ["CarrierId"],
            type: "foreign key",
            name: "CarrierPhones_association",
            references: {
                table: "Carriers",
                field: "id",
            },
        });
    },
};
