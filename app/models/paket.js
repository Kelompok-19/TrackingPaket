const { Sequelize, Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db').db();

const User = require('./user');

class Paket extends Model {}

Paket.init({
    paketid: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    tujuanpaket: { type: DataTypes.STRING, allowNull: false },
    pengirimpaket: { type: DataTypes.STRING, allowNull: false },
    pengirimterdaftar: { type: DataTypes.INTEGER, references: { model: User, key: 'userid', deferrable: Deferrable.INITIALLY_IMMEDIATE } },
}, { sequelize, modelName: 'paket'});
module.exports = Paket;