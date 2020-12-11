const Paket = require('../models/paket');
const Request = require('../models/request');
const StatusCode = require('../models/statuscode');

module.exports.get = (req, res) => {
    res.render('status-pengiriman');
}

module.exports.getid = (req, res) => {
    async function getid() {
        resi = req.params.resi;

        paket = await Paket.findOne({
            raw: true,
            where: {
                no_resi : resi,
            }
        });

        if(paket !== null){
            current_request = await Request.findOne({
                raw: true,
                where: {
                    request_id: paket.paket_id,
                }
            });

            status = await StatusCode.findOne({
                raw: true,
                where: {
                    status_id: paket.status,
                }
            })

            res.render('status-pengiriman/status-pengiriman-detail', { paket: paket, request: current_request, status: status.status_msg });
        }
        res.redirect('/404');
    }
    getid();
}

module.exports.register = function (router) {
    router.get('/status', this.get);
    router.get('/status/:resi', this.getid);
}