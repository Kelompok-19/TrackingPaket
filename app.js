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
    .command('initdb', 'Create a database for the webapp', {
        'verbose': {
            alias: 'v',
            description: 'Enable verbose error printing'
        },
        'heroku' : {
            description: 'Get setting from ENVVAR for use in a heroku environment'
        }
    })
    .command('run', 'Run webapp', {
        'heroku' : {
            description: 'Get setting from ENVVAR for use in a heroku environment'
        }
    })
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
            "defaultDb": "postgres",
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
        console.log('Edit settings.json. This webapp uses PostgreSQL.')
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

    let admin_config = {
        username: prompt('Admin username: '),
        password: prompt('Admin password: ', { echo: '*' }),
        email: prompt('Admin email: '),
        front_name: prompt('Admin front name: '),
        last_name: prompt('Admin last name: '),
    };

    let setting = undefined;

    if(argv.heroku){
        const url = require('url');
        db_connection_string = url.parse(process.env.DATABASE_URL);
        setting.dbOptions.dbName = process.env.DATABASE_NAME;
        setting.dbOptions.host = db_connection_string.hostname;
        setting.dbOptions.port = db_connection_string.port;
        credential = db_connection_string.auth.split('/');
        setting.dbOptions.username = credential[0];
        setting.dbOptions.password = credential[1];
        setting.dbOptions.defaultDb = db_connection_string.path.replace('/','');

        setting.static_files_dir = process.env.STATIC_DIR;
        setting.port = process.env.PORT || 80;
        setting.secret = process.env.SECRET;
    } else {
        let fs = require('fs');
        setting = fs.readFileSync('settings.json');
        setting = JSON.parse(setting);
    }


    db.first_init(setting.dbOptions, admin_config, (argv.v));
}

if(argv._.includes('run')){
    let setting = undefined;

    if(argv.heroku){
        const url = require('url');
        db_connection_string = url.parse(process.env.DATABASE_URL);
        setting.dbOptions.dbName = process.env.DATABASE_NAME;
        setting.dbOptions.host = db_connection_string.hostname;
        setting.dbOptions.port = db_connection_string.port;
        credential = db_connection_string.auth.split('/');
        setting.dbOptions.username = credential[0];
        setting.dbOptions.password = credential[1];
        setting.dbOptions.defaultDb = db_connection_string.path.replace('/','');

        setting.static_files_dir = process.env.STATIC_DIR;
        setting.port = process.env.PORT || 80;
        setting.secret = process.env.SECRET;
    } else {
        const fs = require('fs');
        setting = fs.readFileSync('settings.json');
        setting = JSON.parse(setting);
    }

    db.init(setting.dbOptions);

    const express = require('express');
    const session = require('express-session');
    const passport = require('passport');
    const bodyparser = require('body-parser');

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

    app.use(bodyparser.urlencoded({ extended: true }));

    // Add global variable that views can see here
    app.use((req, res, next) => {
        res.locals.user = req.user;
        res.locals.current_path = req.path;
        res.locals.current_path_relative = '.' + req.path;
        next();
    })

    app.use(require('./app/routes'));

    // If router can't find anything
    app.use((req, res, next) => {
        res.redirect('/404');
    })

    app.listen(setting.port);
    console.log(`server is running on ${setting.port}.`);
}