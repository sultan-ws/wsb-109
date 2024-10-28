const express = require('express');
const {
    createProduct,
    readProducts
} = require('../../controllers/controllers');
const uploads = require('../../middlewares/multer');

const productRouter = express.Router();

productRouter.post('/create-product', uploads('products'), createProduct);
productRouter.get('/read-products', readProducts);

module.exports = productRouter;