const { Model, DataTypes, Deferrable } = require('sequelize');
const Paket = require('./paket');
const PaketLogType = require('./paket-logtype');

const sequelize = require('../db').db();

class PaketLog extends Model {}

PaketLog.init({
    paket_id: { type: DataTypes.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: Paket, key: 'paket_id', deferrable: Deferrable.INITIALLY_IMMEDIATE }},
    log_type: { type: DataTypes.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: PaketLogType, key: 'type_id', deferrable: Deferrable.INITIALLY_IMMEDIATE }},
    log_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    log_msg: { type: DataTypes.STRING, allowNull: false },    
}, { sequelize, modelName: 'paketlog', freezeTableName: true});

module.exports = PaketLog;