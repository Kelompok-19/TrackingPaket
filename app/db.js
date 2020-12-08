const { Sequelize } = require('sequelize');
const pg = require('pg');

var sequelize = null;

module.exports.first_init = function(dbSettings){
    let dbName = dbSettings.dbName,
    username = dbSettings.username,
    password = dbSettings.password,
    host = dbSettings.host,
    port = dbSettings.port

    let createConnectionString = 'postgres://' + username + ':' + password + '@' + host + ':' + port + '/' + dbName;

    let pool = new pg.Pool({
        user: username,
        host: host,
        port: port,
        password: password,
        database: 'postgres',
    })

    pool.query('CREATE DATABASE ' + dbName, (err, res) =>{
        if (!err) {
            console.log('Successfully created database');
        }
        else {
            console.log("Failed creating database \n", err);
        }
        sequelize = new Sequelize(createConnectionString);

        var User = require('./models/user')
        var Paket = require('./models/paket')

        sequelize.sync()
        pool.end();
    })
};

module.exports.init = function(dbSettings){
    let dbName = dbSettings.dbName,
        username = dbSettings.username,
        password = dbSettings.password,
        host = dbSettings.host,
        port = dbSettings.port

    let createConnectionString = 'postgres://' + username + ':' + password + '@' + host + ':' + port + '/' + dbName;

    sequelize = new Sequelize(createConnectionString);

    var User = require('./models/user')
    var Paket = require('./models/paket')
}

module.exports.db = function(){
    return sequelize;
};