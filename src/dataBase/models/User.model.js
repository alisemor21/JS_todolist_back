const Sequelize = require('sequelize');
const { sequelize } = require('..');

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        login: {
            type: Sequelize.STRING,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            defaultValue: 'Title',
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            // allowNull defaults to true
          },
        name: {
            type: Sequelize.STRING,
            defaultValue: false,
        },
    },

    { sequelize: sequelize, underscored: true, modelName: 'todo' }
);

module.exports = User