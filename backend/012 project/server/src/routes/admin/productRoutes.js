const express = require('express');
const { createProduct } = require('../../controllers/controllers');
const uploads = require('../../middlewares/multer');

const productRouter = express.Router();

productRouter.post('/create-product', uploads('products'), createProduct);

module.exports = productRouter;