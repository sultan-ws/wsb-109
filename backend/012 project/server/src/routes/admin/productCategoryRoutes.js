const express = require('express');
const uploads = require('../../middlewares/multer');
const {
    createProductCategory,
    readProductCategories,
    activeProductCategoryByParentCategory
} = require('../../controllers/controllers');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/create-category', uploads('product-category'), createProductCategory);
productCategoryRouter.get('/read-categories', readProductCategories);
productCategoryRouter.get('/active-categories/:id', activeProductCategoryByParentCategory)

module.exports = productCategoryRouter;