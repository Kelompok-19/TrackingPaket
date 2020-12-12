const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db').db();

class UserType extends Model {}

UserType.init({
    type_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    type_name: { type: DataTypes.STRING, allowNull: false },
    type_desc: { type: DataTypes.STRING }
}, { sequelize, modelName: 'usertype'});

module.exports = UserType;

module.exports.typemap = {
    "ADMIN" : [0, "Admin"],
    "STAFF" : [1, "Staff"],
    "USER" : [2, "User"],
};

module.exports.initialize = function () {
    for (typename in this.typemap){
        UserType.create({
            type_id: this.typemap[typename][0],
            type_name: typename,
            type_desc: this.typemap[typename][1],
        });
    }
}