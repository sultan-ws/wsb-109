const express = require('express');
const {
    createParentCategory
} = require('../../controllers/admin-panel/parentCategoryControllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/create-category', createParentCategory);

module.exports = parentCategoryRouter