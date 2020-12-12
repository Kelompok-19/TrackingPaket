const get = (view) => {
    return (req, res) => {
        res.render(view);
    };
}

module.exports.register = function (router) {
    router.get('/', get('index'))
    router.get('/status', get('status-pengiriman'));
    router.get('/contact', get('contactus'));
    router.get('/faq', get('faq'));
    router.get('/ongkir', get('cek-ongkir'));
    router.get('/404', get('404'));
}