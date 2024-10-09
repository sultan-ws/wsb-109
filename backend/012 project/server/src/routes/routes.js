const express = require('express');
const adminRoutes = require('./admin/adminRoutes');

const adminPanelRoutes = express.Router();
const websiteRoutes = express.Router();
const appRoutes = express.Router();

adminPanelRoutes.use('/admin', adminRoutes);

module.exports = {
    adminPanelRoutes,
    websiteRoutes,
    appRoutes
}