const createProduct = async (req, res) =>{
    try{
        console.log(req.body);
        console.log(req.files);
        res.status(200).json({message: 'success'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Error creating product"});
        }
};

module.exports = {
    createProduct
}