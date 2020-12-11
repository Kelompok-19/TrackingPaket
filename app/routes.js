const express = require('express');
const router = express.Router();

require('./routes/login').register(router);
require('./routes/logout').register(router);
require('./routes/register').register(router);
require('./routes/dashboard').register(router);
require('./routes/request-pickup').register(router);
require('./routes/admin').register(router);
require('./routes/default').register(router);

module.exports = router;