const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db').db();

class Request extends Model {}

Request.init({
    nama_pengirim: { type: DataTypes.STRING, allowNull: false },
    no_telp_pengirim: { type: DataTypes.STRING, allowNull: false },
    alamat_pengirim: { type: DataTypes.STRING, allowNull: false },
    nama_penerima: { type: DataTypes.STRING, allowNull: false },
    no_telp_penerima: { type: DataTypes.STRING, allowNull: false },
    alamat_penerima: { type: DataTypes.STRING, allowNull: false },
    berat: { type: DataTypes.INTEGER, allowNull: false },
    request_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
}, { sequelize, modelName: 'request', freezeTableName: true})

module.exports = Request;
