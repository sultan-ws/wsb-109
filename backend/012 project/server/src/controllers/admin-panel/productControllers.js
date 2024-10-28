const Product = require("../../models/product");

const createProduct = async (req, res) => {
    try {
        const data = req.body;

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;

            if (req.files.image_animation) data.image_animation = req.files.image_animation[0].filename;

            if (req.files.gallery) data.gallery = req.files.gallery.map((img) => img.filename);
        }

        const dataToSave = new Product(data);
        const response = await dataToSave.save();

        res.status(200).json({ message: 'success', data: response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating product" });
    }
};

const readProducts = async (req, res) => {
    try{
        const response = await Product.find()
        .populate('parent_category')
        .populate('product_category')
        .populate('colors')
        .populate('sizes');
        res.status(200).json({message:'success', data:response});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating product" });
    }
}

module.exports = {
    createProduct,
    readProducts
}