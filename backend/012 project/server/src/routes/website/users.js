const express = require('express');
const { genrateOtpUser, registerUser } = require('../../controllers/controllers');

const userRouter = express.Router();

userRouter.post('/genrate-otp', genrateOtpUser);
userRouter.post('/register-user', registerUser);

module.exports = userRouter;