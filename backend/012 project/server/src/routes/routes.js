const express = require('express');
const adminRoutes = require('./admin/adminRoutes');
const parentCategoryRouter = require('./admin/parentCategoryRoutes');
const productCategoryRouter = require('./admin/productCategoryRoutes');
const colorRouter = require('./admin/colorRoutes');
const sizeRouter = require('./admin/sizeRoutes');
const productRouter = require('./admin/productRoutes');
const websiteProductRoutes = require('./website/products');
const userRouter = require('./website/users');
const cartRouter = require('./website/cartRoutes');
const paymentRouter = require('./website/paymentRoutes');

const adminPanelRoutes = express.Router();
const websiteRoutes = express.Router();
const appRoutes = express.Router();

adminPanelRoutes.use('/admin', adminRoutes);
adminPanelRoutes.use('/parent-category', parentCategoryRouter);
adminPanelRoutes.use('/product-category', productCategoryRouter);
adminPanelRoutes.use('/colors', colorRouter);
adminPanelRoutes.use('/sizes', sizeRouter);
adminPanelRoutes.use('/products', productRouter);

websiteRoutes.use('/products', websiteProductRoutes);
websiteRoutes.use('/user', userRouter);
websiteRoutes.use('/cart', cartRouter);
websiteRoutes.use('/payment', paymentRouter);

module.exports = {
    adminPanelRoutes,
    websiteRoutes,
    appRoutes
}