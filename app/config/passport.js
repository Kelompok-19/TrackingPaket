const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const { Op } = require('sequelize');

const User = require('../models/user');

var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
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
            if (!req.body.email || !req.body.nama_depan){
                return done(null, false, { message: "Data kurang lengkap." });
            }
            User.findOne({ 
                where : {
                    [Op.or]: [{username: username}, {email: req.body.email}],
                }}).then((user) => {
                if (user) {
                    return done(null, false, { message: "Username atau Email sudah terdaftar" });
                } else {
                    var passwordHash = generateHash(password);

                    User.create({ 
                        username: username,
                        password: passwordHash,
                        email: req.body.email,
                        nama_depan: req.body.nama_depan,
                        nama_belakang: req.body.nama_belakang,
                     }).then((user) => {
                        req.logIn(user, (err) => {
                            if (err) console.log(err);
                        });
                        return done(null, user);
                     }, (reject) => {
                        return done(null, false);
                     });
                }
            })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.getDataValue('user_id'));
    });

    passport.deserializeUser((id, done) => {
        User.findOne({where: { user_id: id } }).then((user) => {
            if (!user) {
                return done(new Error('User not found'), user);
            } else {
                return done(null, user);
            }
        })
    });
}