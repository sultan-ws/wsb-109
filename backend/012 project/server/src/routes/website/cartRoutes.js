const express = require('express');
const { createCart, readCart, deleteCart, updateCart } = require('../../controllers/controllers');
const cartRouter = express.Router();

cartRouter.post('/add-to-cart', createCart);
cartRouter.get('/read-cart/:user', readCart);
cartRouter.put('/update-cart/:_id', updateCart);
cartRouter.delete('/delete-cart/:_id', deleteCart);

module.exports = cartRouter;