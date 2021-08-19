const { Sequelize } = require('sequelize');
dotenv = require('dotenv').config();


const dataBase = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_MDP, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: 8889
});

module.exports = dataBase;