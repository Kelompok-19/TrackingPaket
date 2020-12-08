const bcrypt = require('bcryptjs');
const { framework } = require('passport');
const LocalStrategy = require('passport-local').Strategy;;

const User = require('../models/user');

var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

module.exports = function(passport){
    passport.use('local-login',
        new LocalStrategy( { usernameField: "username", passwordField: "password" }, (username, password, done) => {
            User.findOne({ where : { username: username } }).then((user) => {
                if (!user) {
                    return done(null, false, { message: "Username atau password salah" });
                } else {
                    bcrypt.compare(password, user.getDataValue('password'), (err, success) => {
                        if (err) throw err;

                        if (success) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Username atau password salah" })
                        }
                    })
                }
            })
        })
    );

    passport.use('local-register',
        new LocalStrategy( {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        }, (req, username, password, done) => {
            User.findOne({ where : { username: username } }).then((user) => {
                if (user) {
                    return done(null, false, { message: "Username sudah terdaftar" });
                } else {
                    var passwordHash = generateHash(password);

                    User.create({ 
                        username: username,
                        password: passwordHash,
                        email: req.body.email
                     }).then((user) => {
                        return done(null, user);
                     }, (reject) => {
                        return done(null, false);
                     });
                }
            })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.getDataValue('userid'));
    });

    passport.deserializeUser((id, done) => {
        User.findOne({where: { userid: id } }).then((user) => {
            if (!user) {
                return done(new Error('User not found'), user);
            } else {
                return done(null, user);
            }
        })
    });
}