const express = require('express');
const {
    createColor,
    activeColors
} = require('../../controllers/controllers');

const colorRouter = express.Router();

colorRouter.post('/create-color', createColor);
colorRouter.get('/active-colors', activeColors);

module.exports = colorRouter