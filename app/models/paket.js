const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db').db();

const User = require('./user');
const StatusCode = require('./statuscode');
const Request = require('./request');

class Paket extends Model {}

Paket.init({
    paket_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, references: { model: Request, key: 'request_id', deferrable: Deferrable.INITIALLY_IMMEDIATE }  },
    status: { type: DataTypes.INTEGER, allowNull: false, references: { model: StatusCode, key: 'status_id', deferrable: Deferrable.INITIALLY_IMMEDIATE } },
    assigned_staff: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'user_id', deferrable: Deferrable.INITIALLY_IMMEDIATE } },
}, { sequelize, modelName: 'paket', freezeTableName: true});

module.exports = Paket;