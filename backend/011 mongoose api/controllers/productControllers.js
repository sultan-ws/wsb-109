const Product = require("../models/product");


const addProduct = async(req, res)=>{
    try{
        const data = req.body;

        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;

            if(req.files.images) data.images = req.files.images.map((file)=> file.filename);
        }

        const dataToSave = new Product(data);

        const response = await dataToSave.save();

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const readProducts = async(req, res) =>{
    try{
        const response = await Product.find();

        const filepath = `${req.protocol}://${req.get('host')}/api-files/`

        res.status(200).json({message: 'success', data: response, filepath});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    addProduct,
    readProducts
};