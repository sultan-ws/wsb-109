const express = require('express');
const { genrateOtpUser, registerUser, verifyUser } = require('../../controllers/controllers');

const userRouter = express.Router();

userRouter.post('/genrate-otp', genrateOtpUser);
userRouter.post('/register-user', registerUser);
userRouter.post('/verify-login', verifyUser);

module.exports = userRouter;