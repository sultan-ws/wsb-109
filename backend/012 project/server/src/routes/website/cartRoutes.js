const express = require('express');
const { createCart, readCart } = require('../../controllers/controllers');
const cartRouter = express.Router();

cartRouter.post('/add-to-cart', createCart);
cartRouter.get('/read-cart/:user', readCart);

module.exports = cartRouter;