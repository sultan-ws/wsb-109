const express = require('express');
const uploads = require('../middelwares/multer');
const { addProduct, readProducts } = require('../controllers/productControllers');

const productRouter = express.Router();

productRouter.post('/insert-data', uploads, addProduct);

productRouter.get('/read-data', readProducts)

module.exports = productRouter;