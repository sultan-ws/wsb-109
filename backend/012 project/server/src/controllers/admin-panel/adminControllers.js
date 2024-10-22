const Admin = require("../../models/admin");
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const testAdmin = (req, res) => {
    res.status(200).json({ message: 'test successfull' });
};

const registerAdmin = async () => {
    try {
        const ifAdmin = await Admin.findOne({ email: process.env.ADMINEMAIL });

        if (ifAdmin) return console.log(ifAdmin);

        const data = new Admin({
            email: process.env.ADMINEMAIL,
            password: process.env.ADMINPASSWORD
        });

        const response = await data.save();

        console.log(response);

    }
    catch (error) {
        console.log(error);
    }
};

const adminLogin = async (req, res) => {
    try {

        const ifAdmin = await Admin.findOne({ email: req.body.email });

        if (!ifAdmin) return res.status(403).json({ message: 'invalid email' });

        if (ifAdmin.password !== req.body.password) return res.status(400).json({ message: 'invalid password' });

        // const {password, ...data} = ifAdmin._doc;


        if (ifAdmin.logo) ifAdmin.logo = `${req.protocol}://${req.get('host')}/franandoakservices/admin-panel/${ifAdmin.logo}`;
        if (ifAdmin.favicon) ifAdmin.favicon = `${req.protocol}://${req.get('host')}/franandoakservices/admin-panel/${ifAdmin.favicon}`;
        if (ifAdmin.footer_icon) ifAdmin.footer_icon = `${req.protocol}://${req.get('host')}/franandoakservices/admin-panel/${ifAdmin.footer_icon}`;
        if (ifAdmin.thumbnail) ifAdmin.thumbnail = `${req.protocol}://${req.get('host')}/franandoakservices/admin-panel/${ifAdmin.thumbnail}`;

        // console.log(data);

        res.status(200).json({ message: 'success', data: ifAdmin });
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const olddata = await Admin.findOne(req.params);
        const data = req.body;

        console.log(req.files);

        if (req.files) {
            if (req.files.logo) {
                data.logo = req.files.logo[0].filename;

                if (fs.existsSync(`./src/uploads/admin/${olddata.logo}`)) {
                    fs.unlinkSync(`./src/uploads/admin/${olddata.logo}`);
                }
            }


            if (req.files.favicon) {
                data.favicon = req.files.favicon[0].filename;

                if (fs.existsSync(`./src/uploads/admin/${olddata.favicon}`)) {
                    fs.unlinkSync(`./src/uploads/admin/${olddata.favicon}`);
                }
            }

            if (req.files.footer_icon) {
                data.footer_icon = req.files.footer_icon[0].filename;

                if (fs.existsSync(`./src/uploads/admin/${olddata.footer_icon}`)) {
                    fs.unlinkSync(`./src/uploads/admin/${olddata.footer_icon}`);
                }
            }


            if (req.files.thumbnail) {
                data.thumbnail = req.files.thumbnail[0].filename;

                if (fs.existsSync(`./src/uploads/admin/${olddata.thumbnail}`)) {
                    fs.unlinkSync(`./src/uploads/admin/${olddata.thumbnail}`);
                }
            }
        }

        const response = await Admin.updateOne(
            req.params,
            {
                $set: data
            }
        );
        // console.log(req.files);
        res.status(200).json({ message: 'success', data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

const genrateOtp = async (req, res) => {
    try {
        //0.653643574567
        const newotp = Math.floor(Math.random() * 1000000);

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
            text: `Your OTP is ${newotp} `,
        };

        transporter.sendMail(options, (error, success)=>{
            console.log(error);
            if(error) return res.status(500).json({message: 'try after some time'});
            
            console.log(success);
            res.status(200).json({message: 'success'});

        })

        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};




module.exports = {
    testAdmin,
    registerAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp
}