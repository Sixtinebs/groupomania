const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db_sequelize');
//const User = require('../models/user');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        // references: {
        //     model: 'users',
        //     key: 'id'
        // }
    },
    message: {
        type: DataTypes.TEXT(65000),
        allowNull: false,
    }
}, {
    tableName: 'messages',

});

// `sequelize.define` also returns the model
console.log(Message === sequelize.models.Message); // true
//Message.hasMany(User);
module.exports = Message;

