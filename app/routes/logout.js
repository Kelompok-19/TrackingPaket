const passport = require('passport');

module.exports.get = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.path = "/logout";