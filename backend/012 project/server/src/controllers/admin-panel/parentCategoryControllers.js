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
        if(error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({message: 'category name already exist'});
        res.status(500).json({message: 'internal server error'});
    }
};

const readParentCategory = async (req, res) =>{
    try{
        const data = await ParentCategory.find({deleted_at: null});
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const updateStatusParentCategory = async (req, res) => {
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {$set:{
                status:req.body.status
            }}
        );

        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const deleteParentCategory = async (req, res) =>{
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set:{
                    deleted_at:Date.now()
                }
            }
        );

        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'})
    }
}

const deleteMultipleParentCategories = async (req, res) =>{
    try{
        const data = await ParentCategory.updateMany(
            {_id: {$in: req.body.checkedCategories}},
            {
                $set:{
                    deleted_at:Date.now()
                }
            }
        );

        console.log(req.body);

        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'})
    }
}

module.exports = {
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    deleteParentCategory,
    deleteMultipleParentCategories
}