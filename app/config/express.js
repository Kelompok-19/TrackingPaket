const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;;

const passport = require('passport');
const User = require('../models/user');

module.exports = function(){
    passport.use('local-signup',
        new LocalStrategy( { usernameField: "username", passwordField: "password" }, (username, password, done) => {
            User.findOne({ where : { username: username } }).then((user) => {
                if (!user) {
                    return done(null, null, { message: "Username atau password salah" });
                } else {
                    bcrypt.compare(password, user.getDataValue('password'), (err, success) => {
                        if (err) throw err;

                        if (success) {
                            return done(null, user);
                        } else {
                            return done(null, null, { message: "Username atau password salah" })
                        }
                    })
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