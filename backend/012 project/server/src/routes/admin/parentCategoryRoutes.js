const express = require('express');
const {
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    deleteParentCategory,
    deleteMultipleParentCategories,
    parentCategoryById,
    updateParentCategory,
    deletedParentCategory,
    recoverParentCategory,
    activeParentCategory,
    permanentDeleteParentCategory
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/read-categories', readParentCategory);
parentCategoryRouter.put('/update-status/:_id', updateStatusParentCategory);
parentCategoryRouter.put('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/delete-categories', deleteMultipleParentCategories);
parentCategoryRouter.get('/read-category/:_id', parentCategoryById);
parentCategoryRouter.put('/update-category/:_id', updateParentCategory);
parentCategoryRouter.get('/deleted-categories', deletedParentCategory);
parentCategoryRouter.put('/recover-category/:_id', recoverParentCategory);
parentCategoryRouter.get('/active-category', activeParentCategory);
parentCategoryRouter.delete('/permanent-delete-category/:_id', permanentDeleteParentCategory);

module.exports = parentCategoryRouter;