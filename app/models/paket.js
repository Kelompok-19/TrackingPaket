const { Sequelize, Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db').db();

const User = require('./user');
const StatusCode = require('./statuscode');

class Paket extends Model {}

//STATUS CODE:
//0 : ON PROCESS
//1 : TRANSIT
//2 : RECEIVED
Paket.init({
    paketid: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.INTEGER, allowNull: false, references: { model: StatusCode, key: 'status_id', deferrable: Deferrable.INITIALLY_IMMEDIATE } },
    berat: { type: DataTypes.INTEGER, allowNull: false },
    tujuanpaket: { type: DataTypes.STRING, allowNull: false },
    pengirimpaket: { type: DataTypes.STRING, allowNull: false },
    pengirimterdaftar: { type: DataTypes.INTEGER, references: { model: User, key: 'userid', deferrable: Deferrable.INITIALLY_IMMEDIATE } },
}, { sequelize, modelName: 'paket'});
module.exports = Paket;