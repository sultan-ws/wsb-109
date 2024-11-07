const nodemailer = require('nodemailer');

const otpData = new Map();

const genrateOtpUser = async (req, res) => {
    try {
        // const newotp = Math.floor(Math.random() * 1000000);

        // otpData.set(req.body.email, newotp);
        // console.log(otpData.get(req.body.email))

        // setInterval(()=>{
        //     otpData.delete(req.body.email);
        // },120000);

        // const transporter = nodemailer.createTransport({
        //     service: 'GMAIL',
        //     auth: {
        //         user: process.env.USERMAIL,
        //         pass: process.env.APP_PASSWORD
        //     }
        // });

        // const options = {
        //     from: process.env.USERMAIL,
        //     to: req.body.email,
        //     subject: 'OTP for update email',
        //     text: `Your OTP is ${newotp} `,
        // };

        // transporter.sendMail(options, (error, success)=>{
        //     console.log(error);
        //     if(error) return res.status(500).json({message: 'try after some time'});
            
        //     // console.log(success);
        //     res.status(200).json({message: 'success'});

        // })

        console.log(req.body)

        res.status(200).json({message:'success'});

        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

module.exports = {
    genrateOtpUser
}