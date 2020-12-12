# TrackingPaket - UTS & UAS Web Programming B

Sebuah website sederhana untuk bisnis logistik JAN Express.

Dideploy menggunakan Heroku.

<a href="https://tracking-paket.herokuapp.com/">
<img src="https://github.com/Kelompok-19/TrackingPaket/blob/master/static/img/kurir.jpg" alt="Kurir">
</a>

[https://tracking-paket.herokuapp.com/](https://tracking-paket.herokuapp.com/)

***

Dibuat untuk kelas Web Programming B Universitas Tarumanagara.

## Running
---

### Local
Prerequisites:
- Node 14.15.x
- PostgreSQL


1. Jalankan command
```
npm install
node app.js init
```
2. Konfigurasi settings.json dengan konfigurasi PostgreSQL dan konfigurasi yang diinginkan. Jangan lupa mengubah secret
```
{
    "dbOptions": {
        "dbName": "trackingpaket",
        "host": "localhost",
        "port": 5432,
        "username": "USERNAME",
        "password": "PASSWORD",
        "defaultDb": "postgres"
    },
    "secret": "SESSION_SECRET_KEY_HERE",
    "static_files_dir": "./static/",
    "port": "8085"
}
```
3. Jalankan command, masukan credential untuk login pada webapp
```
node app.js initdb
```
4. Jalankan app dengan
```
node app.js run
```

### Heroku
Prerequisites:
- Heroku CLI


1. Fork project ini dan push ke branch `main` dari git Heroku. Gunakan link [berikut](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true) untuk arahan. Atau bisa juga menggunakan deployment otomatis Heroku.

2. Tambahkan Addons Heroku Postgres.

3. Buat Environment Keys sebagai berikut dari dashboard aplikasi -> Settings -> Config Vars
```
SECRET : ISI_DENGAN_SECRET
STATIC_DIR : ./static/
```
   (Diamkan key DATABASE_URL)
   
4. Jalankan konfigurasi database melalui heroku CLI dengan command:
```
heroku run bash
$ node app.js initdb --heroku
```
   (Argumen heroku harus dijalankan untuk setup dengan heroku!)
   Setelah itu jalankan konfigurasi credential untuk webapp.
   
5. Set konfigurasi Dynos untuk menjalankan app dengan command. Jumlah Dyno bebas asalkan diatas 0
```
heroku ps:scale web=1
```
6. Buka app heroku
