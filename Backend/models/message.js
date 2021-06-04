const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_sequelize');
const User = require('../models/user');

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
        //     model: User,
        //     key: 'id'
        // }
    },
    message: {
        type: DataTypes.TEXT(65000),
        allowNull: false,
    }
}, {
    tableName: 'messages',
    // classMethods: {
    //     associate: function (models) {
    //         models.Message.belongsTo(models.User, { foreignKey: 'fk_messages', as: 'user' });
    //     }
    // }
    associate = (models) => {
        Message.belongsTo(models.User, { foreignKey: 'fk_messages', as: 'user' });
    }

});


// User.hasMany(Message, { foreignKey: 'fk_messages' });
// Message.belongsTo(User, { foreignKey: 'fk_messages' });
// `sequelize.define` also returns the model
Message === sequelize.models.Message; // true
//Message.hasMany(User);
module.exports = Message;

