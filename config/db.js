var Sequelize = require("sequelize");

const DATABASE = process.env.DATABASE || "elIshi";
const USERNAME = process.env.USERNAME || "postgres";
const PASSWORD = process.env.PASSWORD || "samsyk1902";
const HOST = process.env.HOST || "localhost";

const sequelize = new Sequelize("elIshi", "postgres", "samsyk1902", {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
});

module.exports = sequelize;
