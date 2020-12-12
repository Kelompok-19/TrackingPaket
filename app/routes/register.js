const passport = require('passport');

module.exports.get = (req, res) => {
    res.render('register');
}

module.exports.post = (req, res, next) => {
    passport.authenticate('local-register', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { res.render('register', info); }
        else {
            res.redirect('/');
        }
    })(req, res, next);
}

module.exports.register = function (router) {
    router.get('/register', this.get);
    router.post('/register', this.post);
}