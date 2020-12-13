# TrackingPaket - UTS & UAS Web Programming B

Sebuah website sederhana untuk bisnis logistik JAN Express.

Dideploy menggunakan Heroku.

<a href="https://tracking-paket.herokuapp.com/">
<img src="https://github.com/Kelompok-19/TrackingPaket/blob/master/static/img/kurir.jpg" alt="Kurir">
</a>

[https://tracking-paket.herokuapp.com/](https://tracking-paket.herokuapp.com/)

***

Dibuat untuk kelas Web Programming B Universitas Tarumanagara.

***

## Table of Content

* [Penjelasan](#penjelasan)
    * [Unregistered User](#unregistered-user)
    * [Registered User](#registered-user)
    * [Staff](#staff)
    * [Admin](#admin)
* [How to run](#running)
    * [Locally](#local)
    * [With Heroku](#heroku)

## Penjelasan
---

Aplikasi ini mensimulasikan sebuah perusahaan logistik bernama JanExpress. Desain dari webapp kami mementingkan keamanan dari user, dimana kami mengunci fitur-fitur tertentu dibalik tingkat akses dari user. Dengan demikian, Konsumer, Staff, dan Manajemen dapat menggunakan satu website untuk kepentingannya masing-masing.

Sebagai contoh, hanya admin yang bisa menghapus request user. Seorang admin hanya bisa melihat mengubah email user dan tipe user.
Pada halaman pengecekan resi, data yang ditampilkan hanyalah data non-sensitif. Seperti event list, tanggal paket dikirimkan, dll.

Penolakan input dari user yang tidak memiliki izin tidak hanya dilakukan pada client, tapi juga pada server, memastikan kejadian yang tidak diinginkan tidak akan diterima server. Sebagai contoh, bila ada user yang tahu api endpoint untuk menghapus request lain, dan melakukan POST pada endpoint tersebut, server akan menolak permintaan tersebut, kecuali jika user tersebut telah di autentikasi otoritasnya.

Aplikasi web kami memiliki 4 tingkat user:

### Unregistered User

User yang masuk ke website tanpa melakukan login. User tipe ini hanya bisa melihat [resi](https://tracking-paket.herokuapp.com/status) dan menghitung [ongkir](https://tracking-paket.herokuapp.com/ongkir). User ini akan melihat tombol login dan registrasi dari navbar sebelah kiri.

![Unregistered view](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/unregistered.png)
![Register page](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/register.png)
![Login page](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/login.png)

Dibawah kami menyediakan 3 sampel resi untuk contoh:

```
NO RESI
---------------
20201100000004B
20201100000006B
20201100000003B
```

Untuk registered user, berberapa halaman baru dapat diakses dari navbar sebelah kiri yang menyebutkan username.

### Registered User

User yang masuk ke website dan telah melakukan login. Selain memiliki kemampuan user diatas, user tipe ini dapat merequest penjemputan paket dari halaman [pickup](https://tracking-paket.herokuapp.com/pickup).
User yang telah merequest penjemputan paket dapat melihat status dari request mereka dari halaman cek [resi](https://tracking-paket.herokuapp.com/status). Selain itu mereka bisa melengkapi profile mereka untuk autocomplete saat membuat pesanan.

![Profile page](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/profile.png)
![Cek resi](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/cek-resi.png)
![Detail cek resi](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/cek-resi-detail.png)
![Request baru](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/pesanan.png)

Dapat dilakukan registrasi user baru dari halaman registrasi.

### Staff

User yang memiliki tingkat akses staff memiliki semua kemampuan user diatas, ditambah kemampuan untuk memeriksa permintaan paket dan mengecek ulang data-data dari paket. Halaman ini dapat diakses dari [dashboard](https://tracking-paket.herokuapp.com/dashboard). Untuk menciptakan User dengan tingkatan staff, diperlukan approval dari user [admin](#admin) yang akan dibahas pada akhir bagian ini.

![Dashboard staff](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/staff-dashboard.png)
![Dashboard pesanan](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/dashboard-pesanan.png)
![Dashboard log](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/dashboard-log.png)

### Admin

User yang memegang kendali web, untuk inisialisasi user ini pertama kalinya harus dilakukan saat pertama kali inisialisasi web, yang dibahas pada bagian [running](#running).

Admin selain memiliki akses untuk halaman diatas, juga memiliki akses ke berberapa aksi dan halaman baru. Admin dapat mengecek daftar user pada halaman [manage](https://tracking-paket.herokuapp.com/admin). Di halaman ini admin memiliki wewenang untuk mengubah tingkatan user, dan mengganti email user jika ada kesalahan.
Selain itu, admin juga dapat menghapus permintaan yang tidak valid pada halaman [dashboard](https://tracking-paket.herokuapp.com/dashboard).

![Admin dashboard](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/admin-dashboard.png)
![Admin user management](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/admin-manage.png)
![Admin user detail](https://github.com/anthonyme00/github-markdown-resource/blob/main/tracking-paket/admin-manage-detail.png)

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
