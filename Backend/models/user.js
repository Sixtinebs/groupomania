const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db_sequelize');

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false, unique: true
    },
    name: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    password: {
        type: DataTypes.INTEGER(225),
        unique: true,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    tableName: 'users',

});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;

