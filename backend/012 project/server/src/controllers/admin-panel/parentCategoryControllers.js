const ParentCategory = require("../../models/parentCategory");

const createParentCategory = async(req, res)=>{
    try{
        console.log(req.body);
        const dataToSave = new ParentCategory(req.body);
        const data = await dataToSave.save();

        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    createParentCategory
}