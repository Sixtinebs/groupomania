'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Message.belongsTo(models.User, { foreignKey: 'user_id' });
            models.Message.hasMany(models.Comment, { foreignKey: 'id' });
        }
    };
    Message.init({

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        message: {
            type: DataTypes.TEXT(65000),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
};