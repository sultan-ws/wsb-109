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
}


module.exports = {
    testAdmin,
    registerAdmin
}