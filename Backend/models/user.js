const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db_sequelize');

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sexe: {
        type: DataTypes.STRING(1)
    },
    pays: {
        type: DataTypes.STRING(225),
        defaultValue: 'France'
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING(225),
        allowNull: false, unique: true
    },
    password: {
        type: DataTypes.INTEGER(225),
        unique: true, allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    }
}, {
    tableName: 'users',

});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;

