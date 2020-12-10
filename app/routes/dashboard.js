const { Op } = require('sequelize');
const sequelize = require('../db').db();
const Request = require('../models/request');

module.exports.get = (req, res) => {
    Request.findAll( {
        where: {
            request_id : {
                [Op.notIn]: [sequelize.literal('(SELECT p.request_id FROM paket p WHERE p.paket_id = request.request_id)')]
            }
        }
    } ).then((requests) => {
        res.render('dashboard', { requests: requests } );
    });
}

module.exports.path = "/dashboard";