const express = require('express');
const adminRoutes = require('./admin/adminRoutes');
const parentCategoryRouter = require('./admin/parentCategoryRoutes');

const adminPanelRoutes = express.Router();
const websiteRoutes = express.Router();
const appRoutes = express.Router();

adminPanelRoutes.use('/admin', adminRoutes);
adminPanelRoutes.use('/parent-category', parentCategoryRouter);

module.exports = {
    adminPanelRoutes,
    websiteRoutes,
    appRoutes
}