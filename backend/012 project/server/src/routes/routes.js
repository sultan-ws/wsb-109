const express = require('express');
const adminRoutes = require('./admin/adminRoutes');
const parentCategoryRouter = require('./admin/parentCategoryRoutes');
const productCategoryRouter = require('./admin/productCategoryRoutes');
const colorRouter = require('./admin/colorRoutes');
const sizeRouter = require('./admin/sizeRoutes');
const productRouter = require('./admin/productRoutes');

const adminPanelRoutes = express.Router();
const websiteRoutes = express.Router();
const appRoutes = express.Router();

adminPanelRoutes.use('/admin', adminRoutes);
adminPanelRoutes.use('/parent-category', parentCategoryRouter);
adminPanelRoutes.use('/product-category', productCategoryRouter);
adminPanelRoutes.use('/colors', colorRouter);
adminPanelRoutes.use('/sizes', sizeRouter);
adminPanelRoutes.use('/products', productRouter);

module.exports = {
    adminPanelRoutes,
    websiteRoutes,
    appRoutes
}