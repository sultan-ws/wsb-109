const Admin = require("../../models/admin");

const testAdmin = (req, res)=>{
    res.status(200).json({message: 'test successfull'});
};

const registerAdmin = async()=>{
    try{
        const ifAdmin = await Admin.findOne({email: process.env.ADMINEMAIL});

        if(ifAdmin) return console.log(ifAdmin);

        const data = new Admin({
            email: process.env.ADMINEMAIL,
            password: process.env.ADMINPASSWORD
        });

        const response = await data.save();

        console.log(response);

    }
    catch(error){
        console.log(error);
    }
};

const adminLogin = async(req, res) =>{
    try{
        
        const ifAdmin = await Admin.findOne({email: req.body.email});

        if(!ifAdmin) return res.status(403).json({message: 'invalid email'});

        if(ifAdmin.password !== req.body.password) return res.status(400).json({message: 'invalid password'});

        const {password, ...data} = ifAdmin._doc;

        console.log(data);

        res.status(200).json({message: 'success', data});
    }
    catch(error){
        res.status(500).json({message: 'internal server error'});
    }
}


module.exports = {
    testAdmin,
    registerAdmin,
    adminLogin
}