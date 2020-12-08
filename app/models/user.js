const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db').db();

class User extends Model {}

User.init({
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    userid: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
}, { sequelize, modelName: 'user'})
module.exports = User;
