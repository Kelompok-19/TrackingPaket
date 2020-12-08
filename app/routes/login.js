const passport = require('passport');

module.exports.get = (req, res) => {
    res.render('login');
}

module.exports.post = (req, res, next) => {
    passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/register' })(req, res, next);
}

module.exports.path = "/login";