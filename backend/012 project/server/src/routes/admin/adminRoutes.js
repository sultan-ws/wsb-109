const express = require('express');
const { testAdmin } = require('../../controllers/controllers');

const adminRoutes = express.Router();

adminRoutes.get('/test-admin', testAdmin);

module.exports = adminRoutes;