const express = require('express');
const { genrateOtpUser } = require('../../controllers/controllers');

const userRouter = express.Router();

userRouter.post('/genrate-otp', genrateOtpUser);

module.exports = userRouter;