const express = require('express');
const {
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    deleteParentCategory,
    deleteMultipleParentCategories
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/read-categories', readParentCategory);
parentCategoryRouter.put('/update-status/:_id', updateStatusParentCategory);
parentCategoryRouter.put('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/delete-categories', deleteMultipleParentCategories);

module.exports = parentCategoryRouter;