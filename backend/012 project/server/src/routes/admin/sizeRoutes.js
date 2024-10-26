const express = require('express');
const { createSize, activeSizes } = require('../../controllers/controllers');

const sizeRouter = express.Router();

sizeRouter.post('/create-size', createSize);
sizeRouter.get('/active-sizes', activeSizes);

module.exports = sizeRouter;