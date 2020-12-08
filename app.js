const yargs = require('yargs');
const db = require('./app/db');

/*
.command('initdb', 'Create a database for the webapp',{
        'username': {
            alias: 'u',
            description: 'Username for the db',
            type: 'string',
            demandOption: 'Username is required',
        },
        'password': {
            alias: 'p',
            description: 'Password for the db',
            type: 'string',
            demandOption: 'Password is required',
        }
    })
*/
const argv = yargs
    .command('initproject', 'Create starter file needed to run the project')
    .command('initdb', 'Create a database for the webapp')
    .command('run', 'Run webapp')
    .help()
    .alias('help', 'h')
    .demandCommand()
    .argv;

if(argv._.includes('init')){
    console.log('Creating relevant files...');

    const options = {
        "dbOptions": {
            "dbName": "trackingpaket",
            "host": "localhost",
            "port": 5433,
            "username": "INSERT_USERNAME",
            "password": "INSERT_PASSWORD",
        },
    };

    let fs = require('fs');
    fs.writeFileSync('settings.json', JSON.stringify(options, null, 4), (err) => {
        if (err) {
            throw err;
        }

        console.log('Files created');
    });

}

if(argv._.includes('initdb')){
    let fs = require('fs');

    let setting = fs.readFileSync('settings.json');
    setting = JSON.parse(setting)

    db.first_init(setting.dbOptions)
}

if(argv._.includes('run')){
    const express = require('express');
    const session = require('express-session');

    const fs = require('fs');
    let setting = fs.readFileSync('settings.json');

    setting = JSON.parse(setting)

    db.init(setting.dbOptions)

    require('./app/test/tes').test();
}