/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("CarrierAddresses", {
            fields: ["CarrierId"],
            type: "foreign key",
            name: "CarriersAddress_association",
            references: {
                table: "Carriers",
                field: "id",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint("CarrierAddresses", {
            fields: ["CarrierId"],
            type: "foreign key",
            name: "CarriersAddress_association",
            references: {
                table: "Carriers",
                field: "id",
            },
        });
    },
};
