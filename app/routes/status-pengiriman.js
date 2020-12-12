const Paket = require('../models/paket');
const Request = require('../models/request');
const StatusCode = require('../models/statuscode');

module.exports.get = (req, res) => {
    async function get() {
        if(req.isAuthenticated()){
            requestlist = await Request.findAll({
                raw: true,
                where: {
                    requester_id: req.user.user_id,
                }
            });

            for (i in requestlist){
                requestlist[i].paket_id = requestlist[i].request_id;
                
                requestlist[i].no_resi = "";
                requestlist[i].status = "WAITING FOR STAFF";

                paket = await Paket.findOne({
                    raw: true,
                    where: {
                        paket_id: requestlist[i].request_id,
                    }
                });

                if(paket !== null){
                    status = await StatusCode.findOne({
                        raw: true,
                        where: {
                            status_id: paket.status,
                        }
                    });

                    requestlist[i].no_resi = paket.no_resi;
                    requestlist[i].status = status.status_msg
                }
            }

            res.render('status-pengiriman', { paketlist: requestlist });
        } else {
            res.render('status-pengiriman');
        }
    }
    get();
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