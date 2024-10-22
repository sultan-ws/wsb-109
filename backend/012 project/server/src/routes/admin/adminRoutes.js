const express = require('express');
const {
    testAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp
} = require('../../controllers/controllers');
const uploads = require('../../middlewares/multer');

const adminRoutes = express.Router();

adminRoutes.get('/test-admin', testAdmin);
adminRoutes.post('/login', adminLogin);
adminRoutes.put('/update-admin/:_id', uploads('admin'), updateAdmin);
adminRoutes.post('/genrate-otp', genrateOtp);

module.exports = adminRoutes;