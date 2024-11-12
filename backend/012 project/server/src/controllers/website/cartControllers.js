const Cart = require("../../models/cart");

const createCart = async (req, res) => {
    try{
        const ifCart = await Cart.find({user: req.body.user, product:req.body.product, size: req.body.size, color:req.body.color});

        if(ifCart.length !== 0){
            const response = await Cart.updateOne({_id: ifCart[0]._id},{
                $set:{
                    quentity: ifCart[0].quentity + 1
                }
            });

            res.status(200).json({message:'success', data: response});
            return;
        }

        const dataToSave = new Cart(req.body);
        const data = await dataToSave.save();
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const readCart = async (req, res) => {
    try{
        const data = await Cart.find(req.params)
        .populate('user')
        .populate('size')
        .populate('color')
        .populate('product');

        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;

        res.status(200).json({message: 'success', data, filepath});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'internal server error'});
    }
}

const updateCart = async (req, res) => {
    try{
        const data = await Cart.updateOne(
            req.params,
            {
                $set:{
                    quentity: req.body.newQuentity
                }
            }
        );
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const deleteCart = async (req, res) => {
    try{
        const data = await Cart.deleteOne(req.params);
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    createCart,
    readCart,
    updateCart,
    deleteCart
}