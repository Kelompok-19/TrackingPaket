const { isAuthenticated } = require('../auth');
const User = require('../models/user');

module.exports.get = (req, res) => {
    async function get() {
        user = await User.findOne({
            raw: true,
            where: {
                user_id: req.user.user_id,
            }
        });

        res.render('profile', { user: user });
    }
    get();
}

module.exports.post = (req, res, next) => {
    async function post() {
        email = req.body.email;
        nama_depan = req.body.nama_depan;
        nama_belakang = req.body.nama_belakang;
        no_telp = req.body.no_telp;
        alamat = req.body.alamat;
        
        await User.update({
            email: email,
            nama_depan: nama_depan,
            nama_belakang: nama_belakang,
            no_telp: no_telp,
            alamat: alamat,
        }, {
            where: {
                user_id: req.user.user_id,
            }
        });

        res.redirect('/profile');
    }
    post();
}

module.exports.register = function (router) {
    router.get('/profile', isAuthenticated, this.get);
    router.post('/profile', isAuthenticated, this.post);
}