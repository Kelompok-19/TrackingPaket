const passport = require('passport');

module.exports.get = (req, res) => {
    if (req.isAuthenticated()){
        res.redirect('/');
    }
    req.session.ref = req.query.ref;
    res.render('login');
}

module.exports.post = (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { res.render('login', info); }
        else {
            req.login(user, (error) => {
                if (error) { return next(error); }
                else { 
                    let ref = req.session.ref;
                    if(ref){
                        res.redirect(ref); 
                    } else {
                        res.redirect('/'); 
                    }
                }
            })
        }
    })(req, res, next);
}

module.exports.path = "/login";