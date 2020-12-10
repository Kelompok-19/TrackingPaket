const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db').db();

class StatusCode extends Model {}

StatusCode.init({
    status_id : { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    status_msg : { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'statuscode'});

module.exports = StatusCode;

module.exports.initialize = function () {
    StatusCode.create({
        status_id: 0,
        status_msg: "PROCESSING"
    });
    StatusCode.create({
        status_id: 1,
        status_msg: "ON TRANSIT"
    });
    StatusCode.create({
        status_id: 2,
        status_msg: "RECEIVED"
    });
}