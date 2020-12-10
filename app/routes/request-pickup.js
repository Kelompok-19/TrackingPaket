const Request = require('../models/request');

module.exports.get = (req, res) => {
    res.render('request-pickup');
}

module.exports.post = (req, res, next) => {
    nama_pengirim = req.body.pengirim;
    no_telp_pengirim = req.body.no_telp_pengirim;
    alamat_pengirim = req.body.alamat_pengirim;
    nama_penerima = req.body.penerima;
    no_telp_penerima = req.body.no_telp_penerima;
    alamat_penerima = req.body.alamat_penerima;
    berat = req.body.berat;

    if (!nama_pengirim || !no_telp_pengirim || !alamat_pengirim || !nama_penerima || !no_telp_penerima || !alamat_penerima || !berat) {
        res.render('request-pickup', { message: "Data kurang lengkap" });
    } else {
        Request.create({
            nama_pengirim: nama_pengirim,
            no_telp_pengirim: no_telp_pengirim,
            alamat_pengirim: alamat_pengirim,
            nama_penerima: nama_penerima,
            no_telp_penerima: no_telp_penerima,
            alamat_penerima: alamat_penerima,
            berat: berat,
        });

        res.render('request-pickup');
    }    
}

module.exports.path = "/pickup";