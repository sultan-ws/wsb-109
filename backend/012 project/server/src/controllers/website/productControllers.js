const Product = require("../../models/product");

const activeProductWebsite = async (req, res) =>{
    try{
        const data = await Product.find()
        .populate('parent_category')
        .populate('product_category')
        .populate('colors')
        .populate('sizes');

        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;

        res.status(200).json({message: 'success', data, filepath});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    activeProductWebsite
}