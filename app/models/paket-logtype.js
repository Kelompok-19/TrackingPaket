const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db').db();

class PaketLogType extends Model {}

PaketLogType.init({
    type_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    type_name: { type: DataTypes.STRING, allowNull: false },
    type_desc: { type: DataTypes.STRING }
}, { sequelize, modelName: 'paketlogtype'});

module.exports = PaketLogType;

module.exports.typemap = {
    "PICKED_UP" : [0, "Picked up from client"],
    "ON_STORAGE" : [1, "In warehouse"],
    "ON_TRANSIT" : [2, "In transit"],
    "ON_DELIVERY" : [3, "With a delivery courier"],
    "REROUTE" : [4, "Wrong route, rerouting"],
};

module.exports.initialize = function () {
    for (typename in this.typemap){
        PaketLogType.create({
            type_id: this.typemap[typename][0],
            type_name: typename,
            type_desc: this.typemap[typename][1],
        });
    }
}