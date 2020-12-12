const { Op } = require('sequelize');
const sequelize = require('../db').db();
const Request = require('../models/request');
const { isAuthenticated, isAuthenticatedAuthority } = require('../auth');
const Paket = require('../models/paket');
const StatusCode = require('../models/statuscode');
const PaketLogType = require('../models/paket-logtype');
const PaketLog = require('../models/paket-log');

module.exports.createstatus = {
    SUCCESS: '0',
    FAIL: '1',
    NOT_FOUND: '2',
}

module.exports.getbase = (req, res) => {
    async function getbase(createstatus) {
        requests = await Request.findAll( {
            raw: true,
            where: {
                request_id : {
                    [Op.notIn]: [sequelize.literal('(SELECT p.paket_id FROM paket p WHERE p.paket_id = request.request_id)')],
                },
                requester_id : {
                    [Op.not]: req.user.user_id,
                }
            }
        });

        paketlist = await Paket.findAll( {
            raw: true,
            where: {
                assigned_staff: req.user.user_id,
            }
        });

        let message = null;
        if (req.query.status){
            switch (req.query.status) {
                case createstatus.SUCCESS:
                    message = "Berhasil menciptakan/mengupdate paket";
                    break;
                case createstatus.FAIL:
                    message = "Gagal menciptakan paket. Mungkin paket tersebut telah diambil.";
                    break;
                case createstatus.NOT_FOUND:
                    message = "Paket tidak ditemukan. Id request salah.";
                    break;
            }
        }

        for (i in paketlist) {
            status_code = await StatusCode.findOne({
                raw: true,
                where: {
                    status_id: paketlist[i].status,
                }
            });
            paketlist[i].status = status_code.status_msg;
        }

        res.render('dashboard', { requests: requests, paketlist: paketlist, message: message } );
    }

    getbase(this.createstatus);
}

module.exports.getid = (req, res) => {
    async function getid() {
        id = req.params.reqId;
        current_request = await Request.findOne({ 
            raw: true,
            where: {
                request_id: id,
            }
        });

        if (current_request === null) {
            res.redirect('/404');
        }

        paket = await Paket.findOne({
            raw: true,
            where: {
                paket_id: id,
            }
        })

        function getResiString(paketid, nama){
            let date = new Date();
            return date.getFullYear().toString() + date.getMonth().toString() + paketid.toString().padStart(8, '0') + nama[0].toString().toUpperCase();
        }

        if (paket === null){
            paket = await Paket.create({
                paket_id: id,
                status: 0,
                assigned_staff: req.user.user_id,
                no_resi: getResiString(id, current_request.nama_pengirim),
            });
        }

        if (paket.assigned_staff === req.user.user_id){
            status_codes = await StatusCode.findAll({
                raw: true,
            });
            res.render('dashboard/dashboard-edit', { request: current_request, paket: paket, status_codes: status_codes });
        } else {
            res.redirect('/404');
        }
    }
    getid();
}

module.exports.getremoveid = (req, res) => {
    id = req.params.reqId;
    Request.destroy({ 
        where: {
            request_id: id,
        }
    }).then(()=>{
        res.redirect('/dashboard');
    });
}

module.exports.postid = (req, res) => {
    async function postid(createstatus) {
        id = req.params.reqId;
        current_request = Request.findOne({
            raw: true,
            where: {
                request_id: id,
            }
        });

        if (current_request === null) {
            res.redirect('/dashboard' + `?status=${createstatus.NOT_FOUND}`);
        } else {
            paket = await Paket.findOne({
                where: {
                    paket_id: id,
                }
            });

            if(paket !== null) {
                nama_pengirim = req.body.pengirim;
                no_telp_pengirim = req.body.no_telp_pengirim;
                alamat_pengirim = req.body.alamat_pengirim;
                nama_penerima = req.body.penerima;
                no_telp_penerima = req.body.no_telp_penerima;
                alamat_penerima = req.body.alamat_penerima;
                berat = req.body.berat;

                await Paket.update({
                    biaya: req.body.biaya,
                    status: req.body.tipe_status,
                }, {
                    where: {
                        paket_id: id,
                    }
                });

                Request.update({ 
                    nama_pengirim: nama_penerima,
                    no_telp_pengirim: no_telp_pengirim,
                    alamat_pengirim: alamat_pengirim,
                    nama_penerima: nama_penerima,
                    no_telp_penerima: no_telp_penerima,
                    alamat_penerima: alamat_penerima,
                    berat: berat,
                }, { 
                    where: {
                        request_id: id,
                    }
                })

                res.redirect('/dashboard' + `?status=${createstatus.SUCCESS}`);
            } else {
                res.redirect('/dashboard' + `?status=${createstatus.FAIL}`);
            }
        }
    }
    
    postid(this.createstatus);
}

module.exports.getlog = (req, res) => {
    async function getlog() {
        paket_id = req.params.paketId;

        paket = await Paket.findOne({
            where: {
                paket_id: paket_id,
            }
        })

        if(paket === null){
            res.redirect('/dashboard');
        } else {
            if(paket.assigned_staff != req.user.user_id){
                res.redirect('/dashboard');
                return;
            }

            logtypes = await PaketLogType.findAll({
                raw: true,
            });

            res.render('dashboard/dashboard-log', { logtypes: logtypes });
        }
    }
    getlog();
}

module.exports.postlog = (req, res) => {
    async function postlog() {
        paket_id = req.params.paketId;

        paket = await Paket.findOne({
            where: {
                paket_id: paket_id,
            }
        })

        if(paket === null){
            res.redirect('/dashboard');
        } else {
            if(paket.assigned_staff != req.user.user_id){
                res.redirect('/dashboard');
                return;
            }

            message = req.body.message;
            type_id = req.body.tipe_status;

            await PaketLog.create({
                paket_id: paket_id,
                log_type: type_id,
                log_msg: message,
            })

            res.redirect('/dashboard');
        }
    }
    postlog();
}

module.exports.register = function (router) {
    router.get('/dashboard', isAuthenticatedAuthority(['STAFF', 'ADMIN']), this.getbase);
    router.get('/dashboard/:reqId', isAuthenticatedAuthority(['STAFF', 'ADMIN']), this.getid);
    router.get('/dashboard/hapus/:reqId', isAuthenticatedAuthority(['ADMIN']), this.getremoveid);
    router.get('/dashboard/log/:paketId', isAuthenticatedAuthority(['STAFF', 'ADMIN']), this.getlog);
    router.post('/dashboard/:reqId', isAuthenticatedAuthority(['STAFF', 'ADMIN']), this.postid);
    router.post('/dashboard/log/:paketId', isAuthenticatedAuthority(['STAFF', 'ADMIN']), this.postlog);
}