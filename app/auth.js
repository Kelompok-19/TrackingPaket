const { Op } = require('sequelize');
const UserType = require("./models/usertype");

module.exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect(`/login?ref=${req.url}`);
}

module.exports.isAuthenticatedAuthority = (approvedUserTypes) => {
    return (req, res, next) => {
        if(req.isAuthenticated()){
            UserType.findOne({
                where: {
                    type_id : req.user.user_type,
                }
            }).then((type) => {
                for (id in approvedUserTypes){
                    if (type.type_name == approvedUserTypes[id]) {
                        return next();
                    }
                }
                res.redirect('/404');
            }, () => {
                res.redirect('/404');
            })
        } else {
            res.redirect('/404');
        }
    }
}