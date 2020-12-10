const express = require('express');
const { isAuthenticated } = require('./auth');
const router = express.Router();

const index = require('./routes/index');
router.get(index.path, index.get);

const login = require('./routes/login');
router.get(login.path, login.get);
router.post(login.path, login.post);

const logout = require('./routes/logout');
router.get(logout.path, logout.get);

const register = require('./routes/register');
router.get(register.path, register.get);
router.post(register.path, register.post);

const dashboard = require('./routes/dashboard');
router.get(dashboard.path, isAuthenticated, dashboard.get);

const request_pickup = require('./routes/request-pickup');
router.get(request_pickup.path, isAuthenticated, request_pickup.get);
router.post(request_pickup.path, isAuthenticated, request_pickup.post);

const defaults = require('./routes/default');
for (path in defaults.routeMap){
    let localpath = path;
    router.get(localpath, (req, res) => {
        res.render(defaults.routeMap[localpath]);
    });
}

module.exports = router;