const express = require('express');
const {
    testAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp,
    updateEmail
} = require('../../controllers/controllers');
const uploads = require('../../middlewares/multer');

const adminRoutes = express.Router();

adminRoutes.get('/test-admin', testAdmin);
adminRoutes.post('/login', adminLogin);
adminRoutes.put('/update-admin/:_id', uploads('admin'), updateAdmin);
adminRoutes.post('/genrate-otp', genrateOtp);
adminRoutes.post('/update-email', updateEmail)

module.exports = adminRoutes;