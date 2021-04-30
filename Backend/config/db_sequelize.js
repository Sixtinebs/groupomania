const { Sequelize } = require('sequelize');

const dataBase = new Sequelize("groupomania", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    port: 8889
});

module.exports = dataBase;