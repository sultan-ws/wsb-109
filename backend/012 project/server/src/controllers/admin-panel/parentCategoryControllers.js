const ParentCategory = require("../../models/parentCategory");
const Product = require("../../models/product");
const ProductCategory = require("../../models/productCategory");

const createParentCategory = async (req, res) => {
    try {
        console.log(req.body);
        const dataToSave = new ParentCategory(req.body);
        const data = await dataToSave.save();

        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category name already exist' });
        res.status(500).json({ message: 'internal server error' });
    }
};

const readParentCategory = async (req, res) => {
    try {
        const data = await ParentCategory.find({ deleted_at: null });
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

const updateStatusParentCategory = async (req, res) => {
    try {
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.status
                }
            }
        );

        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

const deleteParentCategory = async (req, res) => {
    try {
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        );

        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
}

const deleteMultipleParentCategories = async (req, res) => {
    try {
        const data = await ParentCategory.updateMany(
            { _id: { $in: req.body.checkedCategories } },
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        );

        console.log(req.body);

        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
}

const parentCategoryById = async (req, res) => {
    try {
        const data = await ParentCategory.findById(req.params._id);

        if(!data) return res.status(404).json({message: 'no data found'});

        res.status(200).json({message: 'success', data});
    }
    catch (error) {
        console.log(error);
        if(error.kind && error.kind === 'ObjectId') return  res.status(401).json({ message: 'invalid category id' });
        res.status(500).json({ message: 'internal server error' });
    }
};

const updateParentCategory = async (req, res)=>{
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set:{
                    name: req.body.name,
                    description: req.body.description
                }
            }
        );

        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category name already exist' });
        res.status(500).json({messagr: 'internal server error'});
    }
}

const deletedParentCategory = async (req, res) => {
    try {
        const data = await ParentCategory.find({ deleted_at: {$ne: null} });
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const recoverParentCategory = async (req, res) =>{
    try{
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set:{
                    deleted_at:null
                }
            }
        );

        res.status(200).json({message: 'success', data});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const activeParentCategory = async (req, res)=>{
    try{
        const data = await ParentCategory.find({status: true, deleted_at: null});
        res.status(200).json({message: 'success', data})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const permanentDeleteParentCategory = async (req, res) => {
    try{
        await ProductCategory.deleteMany({parent_category: req.params._id});
        await Product.deleteMany({parent_category: req.params._id});
        const response = await ParentCategory.deleteOne(req.params);

        res.status(200).json({message: 'success', data: response});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

module.exports = {
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    deleteParentCategory,
    deleteMultipleParentCategories,
    parentCategoryById,
    updateParentCategory,
    deletedParentCategory,
    recoverParentCategory,
    activeParentCategory,
    permanentDeleteParentCategory
};