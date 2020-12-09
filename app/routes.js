const express = require('express');
const { isAuthenticated } = require('./auth');
const router = express.Router();

const checkauth = require('./auth').isAuthenticated;

const index = require('./routes/index');
router.get(index.path, index.get);

const login = require('./routes/login');
router.get(login.path, login.get);
router.post(login.path, login.post);

const register = require('./routes/register');
router.get(register.path, register.get);
router.post(register.path, register.post);

const defaults = require('./routes/default');
for (path in defaults.routeMap){
    let localpath = path;
    router.get(localpath, (req, res) => {
        res.render(defaults.routeMap[localpath]);
    });
}

module.exports = router;