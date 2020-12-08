const { SIGINT } = require('constants');
const { check } = require('yargs');
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
        "secret": "SESSION_SECRET_KEY_HERE",
        "static_files_dir": "./static/",
        "port": "8085",
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
    const prompt = require('prompt-sync')({ sigint: true });

    check_continue = false;
    while (!check_continue) {
        console.log("This command will destroy the database which name is in your config file and everything saved to it.\nCan be safely used for first time setup.");
        input = prompt('Are you sure? (yes/no) : ');
        check_continue = input == "yes";
        if (input == "no") {
            return;
        }
    }

    let fs = require('fs');

    let setting = fs.readFileSync('settings.json');
    setting = JSON.parse(setting);

    db.first_init(setting.dbOptions);
}

if(argv._.includes('run')){
    const fs = require('fs');
    let setting = fs.readFileSync('settings.json');
    setting = JSON.parse(setting);

    db.init(setting.dbOptions);

    const express = require('express');
    const session = require('express-session');
    const passport = require('passport');
    require('./app/config/passport')(passport);

    app = express();
    app.set('view engine', 'ejs');
    app.use(express.static(setting.static_files_dir));
    app.use(session({
        secret: setting.secret,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(require('./app/routes'));

    app.listen(setting.port);
    console.log(`server is running on ${setting.port}.`);
}