const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_sequelize');
//const Message = require('../models/message');
const models = require('../models');

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
    // classMethods: {
    //     associate: function (models) {
    //         models.User.hasMany(models.Message, { foreignKey: 'fk_messages', as: 'message' });
    //     }
    // }
    classMethods: {
        associate: function (models) {
            User.hasMany(models.Message);
        }
    }


});

// User.associate = (models) => {
//     models.User.hasMany(models.Message, { foreignKey: 'fk_messages', as: 'message' });
// }
// User.hasMany(Message)
User === sequelize.models.User; // true

module.exports = User;

