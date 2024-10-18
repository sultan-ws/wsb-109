const ProductCategory = require("../../models/productCategory");

const createProductCategory = async (req, res) =>{
    try{
        const data = req.body;
        
        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }

        const dataToSave = new ProductCategory(data);

        const response = await dataToSave.save();

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const readProductCategories = async (req, res) =>{
    try{
        const data = await ProductCategory.find().populate('parent_category');

        const filepath = `${req.protocol}://${req.get('host')}/franandoakservices/admin-panel/`;

        res.status(200).json({message: 'success', data, filepath});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    createProductCategory,
    readProductCategories
}