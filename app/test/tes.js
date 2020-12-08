const db =  require('../db').db();
const User = require('../models/user');

module.exports.test = function(){
    User.create({
        username: 'anthony',
        password: '1213123123',
    })
}