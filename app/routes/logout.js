const passport = require('passport');

module.exports.get = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.register = function (router) {
    router.get('/logout', this.get);
}
