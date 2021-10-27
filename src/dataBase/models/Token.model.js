const Sequelize = require('sequelize');
const { sequelize } = require('..');

class Token extends Sequelize.Model {}

Token.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            
        },
        userId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            
        },
        value: {
            type: Sequelize.STRING,
            
        },
        
    },

    { sequelize: sequelize, underscored: true, modelName: 'token' }
);

module.exports = Token