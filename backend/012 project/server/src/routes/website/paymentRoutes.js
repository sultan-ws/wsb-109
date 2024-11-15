const express = require('express');
const { chekOut } = require('../../controllers/controllers');

const paymentRouter = express.Router();

paymentRouter.post('/checkout', chekOut);

module.exports = paymentRouter;