const nodemailer = require('nodemailer');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const otpData = new Map();

const genrateOtpUser = async (req, res) => {
    try {
        const newotp = Math.floor(Math.random() * 1000000);

        otpData.set(req.body.email, newotp);

        setInterval(() => {
            otpData.delete(req.body.email);
        }, 120000);

        const transporter = nodemailer.createTransport({
            service: 'GMAIL',
            auth: {
                user: process.env.USERMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        const options = {
            from: process.env.USERMAIL,
            to: req.body.email,
            subject: 'OTP for update email',
            // text: `Your OTP is ${newotp} `,

            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }

        div, img{
            width: 100%;

        }

        .otp-container{
            background-color: yellow;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div>
        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkE3_jt77nos0xRJJ_yymWO68-3Ab9pjxrsRiMPseM6y1IRI84" alt="">
    </div>
    <div class="otp-container">
            Your OTP is ${newotp}
    </div>
</body>
</html>;`
        };

        transporter.sendMail(options, (error, success) => {
            if (error) return res.status(500).json({ message: 'try after some time' });

            // console.log(success);
            res.status(200).json({ message: 'success' });

        });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const registerUser = async(req, res) => {
    try{

        const sentOtp = otpData.get(req.body.email);

        if(!sentOtp) return res.status(403).json({message: 'regenrate otp'});

        if(sentOtp !== Number(req.body.otp)) return res.status(401).json({message: 'invalid otp'});

        const dataToSave = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const data = await dataToSave.save();

        const {password, ...dataWithoutPassword} = data._doc;

        jwt.sign(dataWithoutPassword, process.env.JWT_KEY, {expiresIn: 7}, (error, token)=>{
            if(error) return res.status(500).json({messaghe:'try aftr some time'});

            res.status(200).json({message: 'success', data:dataWithoutPassword, token});
        });

       

        otpData.delete(req.body.email);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server'});
    }
}

module.exports = {
    genrateOtpUser,
    registerUser
}