const { Sequelize, Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db').db();

class StatusCode extends Model {}

StatusCode.init({
    status_id : { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    status_msg : { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'statuscode'});

module.exports = StatusCode;