const express = require('express');
const uploads = require('../../middlewares/multer');
const { createProductCategory, readProductCategories } = require('../../controllers/controllers');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/create-category', uploads('product-category'), createProductCategory);
productCategoryRouter.get('/read-categories', readProductCategories);

module.exports = productCategoryRouter;