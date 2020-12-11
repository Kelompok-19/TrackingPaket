const { Op, UniqueConstraintError } = require('sequelize')
const { isAuthenticatedAuthority } = require('../auth');
const User = require('../models/user');
const UserType = require('../models/usertype');

module.exports.get = (req, res) => {
    async function get() {
        usertypes = await UserType.findAll({raw: true});
        users = await User.findAll({
            raw: true,
            where: {
                user_id: {
                    [Op.not]: req.user.user_id,
                }
            }
        });
        usertypemap = new Map();
        for (i in usertypes) {
            usertypemap.set(usertypes[i].type_id, usertypes[i].type_desc);
        }

        res.render('admin', { usertypes: usertypemap, users: users });
    }
    get();
}

module.exports.getid = (req, res) => {
    async function getid() {
        userid = req.params.userId;

        if(userid === req.user.user_id) {
            res.redirect('/admin');
        }
        else{
            usertypes = await UserType.findAll({raw: true});
            user = await User.findOne({
                raw: true,
                where: {
                    user_id: userid,
                }
            });
            res.render('admin/admin-edit', { selected_user: user, usertypes: usertypes });
        }
    }
    getid();
}

module.exports.postid = (req, res) => {
    async function postid() {
        userid = req.params.userId;

        user_type = req.body.tipe_user;
        email = req.body.email;

        if(userid === req.user.user_id) {
            res.redirect('/admin');
        }
        else{
            await User.update({
                email: email,
                user_type: user_type,
            }, {
                where: {
                    user_id: userid,
                }
            });

            res.redirect('/admin');
        }
    }
    postid();
}

module.exports.getremoveid = (req, res) => {
    async function getremoveid() {
        userid = req.params.userId;

        user_type = req.body.tipe_user;
        email = req.body.email;

        if(userid === req.user.user_id) {
            res.redirect('/admin');
        }
        else{
            await User.destroy({
                where: {
                    user_id: userid,
                }
            });

            res.redirect('/admin');
        }
    }
    getremoveid();
}

module.exports.register = function (router) {
    router.get('/admin', isAuthenticatedAuthority(['ADMIN']), this.get);
    router.get('/admin/:userId', isAuthenticatedAuthority(['ADMIN']), this.getid);
    router.get('/admin/hapus/:userId', isAuthenticatedAuthority(['ADMIN']), this.getremoveid);
    router.post('/admin/:userId', isAuthenticatedAuthority(['ADMIN']), this.postid);
}