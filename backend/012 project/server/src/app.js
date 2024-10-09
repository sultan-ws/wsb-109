const express = require('express');
const adminRoutes = require('./routes/admin/adminRoutes');
const { adminPanelRoutes, websiteRoutes, appRoutes } = require('./routes/routes');

const allRoutes = express.Router();

allRoutes.use('/admin-panel', adminPanelRoutes);
allRoutes.use('/website', websiteRoutes);
allRoutes.use('/app', appRoutes);

module.exports = allRoutes;