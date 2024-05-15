const express = require('express');
const router = express.Router();
const path = require('path');
const { authJwt } = require("../middleware");

// const authMiddleware = (req, res, next) => {
//     // Periksa apakah pengguna telah login
//     if (req.isAuthenticated()) {
//         // Jika pengguna telah login, lanjutkan ke fungsi penanganan rute berikutnya
//         next();
//     } else {
//         // Jika pengguna belum login, kembalikan respons redirect ke halaman login
//         res.redirect('/user/login');
//     }
// };
// Gunakan middleware autentikasi untuk rute yang memerlukan autentikasi
router.get('/',[authJwt.verifyToken], (req, res) => {
    // Jika pengguna telah login, berikan akses ke index.html
    res.sendFile(path.join(__dirname, '../views/index.html'));
});


module.exports = router;
