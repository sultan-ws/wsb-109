const express = require('express');
const {
    testAdmin,
    adminLogin,
    updateAdmin
} = require('../../controllers/controllers');
const uploads = require('../../middlewares/multer');

const adminRoutes = express.Router();

adminRoutes.get('/test-admin', testAdmin);
adminRoutes.post('/login', adminLogin);
adminRoutes.put('/update-admin/:_id', uploads('admin'), updateAdmin);

module.exports = adminRoutes;