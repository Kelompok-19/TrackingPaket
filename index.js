const express = require('express');

const app = express();
const port = 3000;

var path = require ('path');

//static files
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname + 'public/css')));
app.use('/js', express.static(path.join(__dirname + 'public/js')));
app.use('/img', express.static(path.join(__dirname + 'public/img')));

//set views
app.set('views', 'public/views');

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/ongkir', (req, res)=>{
    res.render('cek-ongkir')
})

app.get('/status', (req, res)=>{
    res.render('statusPengiriman')
})

app.get('/contact', (req, res)=>{
    res.render('contactus')
})

app.get('/faq', (req, res)=>{
    res.render('faq')
})

app.listen(port, err => {
    console.log(`started on port ${port}`)
});