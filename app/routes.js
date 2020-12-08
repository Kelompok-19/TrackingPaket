const express = require('express')
const router = express.Router();

const index = require('./routes/index');
router.get(index.path, index);

module.exports = router;