const passport = require('passport');

module.exports.get = (req, res) => {
    res.render('register');
}

module.exports.post = (req, res, next) => {
    passport.authenticate('local-register', { successRedirect: '/', failureRedirect: '/login' })(req, res, next);
}

module.exports.path = "/register";