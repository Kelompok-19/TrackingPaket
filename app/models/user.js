const { Model, DataTypes, Deferrable } = require('sequelize');
const bcrypt = require('bcryptjs')
const sequelize = require('../db').db();

const UserType = require('./usertype');

class User extends Model {}

User.init({
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    nama_depan: { type: DataTypes.STRING, allowNull: false },
    nama_belakang: { type: DataTypes.STRING },
    no_telp: { type: DataTypes.STRING, defaultValue: "" },
    alamat: { type: DataTypes.STRING, defaultValue: "" },
    user_type:  { type: DataTypes.INTEGER, defaultValue: UserType.typemap["USER"][0], allowNull: false, references: { model: UserType, key: 'type_id', deferrable: Deferrable.INITIALLY_IMMEDIATE }},
    user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
}, { sequelize, modelName: 'user'})

module.exports = User;

module.exports.createAdmin = function(username, password, email, front_name, last_name = null) {
    User.create({
        username: username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        email: email,
        user_type: UserType.typemap["ADMIN"][0],
        nama_depan: front_name,
        nama_belakang: last_name
    })
}
