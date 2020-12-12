const { Sequelize } = require('sequelize');
const pg = require('pg');

var sequelize = null;

module.exports.first_init = function(dbSettings, admin_config, verbose = false){
    let dbName = dbSettings.dbName,
        username = dbSettings.username,
        password = dbSettings.password,
        host = dbSettings.host,
        port = dbSettings.port;

    let createConnectionString = 'postgres://' + username + ':' + password + '@' + host + ':' + port + '/' + dbName;

    let pool = new pg.Pool({
        user: username,
        host: host,
        port: port,
        password: password,
        database: 'postgres',
    });

    pool.query('CREATE DATABASE ' + dbName, (err, res) =>{
        if (!err) {
            console.log('Successfully created database');
        }
        else {
            if (!verbose) {
                console.log("Failed creating database.\nA database probably already exists with the same name.\nCreating a new database.\nUse with argument -v if error persists");
            }
            else {
                console.log("Faild creating database.", err)
            }
        }

        sequelize = new Sequelize(createConnectionString, { logging: false });

        const usertype = require('./models/usertype');
        const user = require('./models/user');
        const statuscode = require('./models/statuscode');

        require('./models/paket');
        require('./models/request')

        sequelize.sync({ force: true }).then((sequelize) => {
            usertype.initialize();
            user.createAdmin(admin_config.username, admin_config.password, admin_config.email, admin_config.front_name, admin_config.last_name);
            statuscode.initialize();

            console.log('Success initializing database!')
        });
        
        pool.end();
    });
};

module.exports.init = function(dbSettings){
    let dbName = dbSettings.dbName,
        username = dbSettings.username,
        password = dbSettings.password,
        host = dbSettings.host,
        port = dbSettings.port

    let createConnectionString = 'postgres://' + username + ':' + password + '@' + host + ':' + port + '/' + dbName;

    sequelize = new Sequelize(createConnectionString, { logging: false });

    require('./models/statuscode');
    require('./models/usertype');
    require('./models/user');
    require('./models/paket');
    require('./models/request');
}

module.exports.db = function(){
    return sequelize;
};