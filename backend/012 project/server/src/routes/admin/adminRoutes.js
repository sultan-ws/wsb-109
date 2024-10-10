const express = require('express');
const {
    testAdmin,
    adminLogin
} = require('../../controllers/controllers');

const adminRoutes = express.Router();

adminRoutes.get('/test-admin', testAdmin);
adminRoutes.post('/login', adminLogin);

module.exports = adminRoutes;