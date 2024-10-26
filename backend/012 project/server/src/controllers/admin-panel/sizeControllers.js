const Size = require("../../models/size");

const createSize = async (req, res) => {
    try{        
        const data = new Size(req.body);
        const response = await data.save();
        res.status(200).json({message: 'success', data: response});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const activeSizes = async (req, res) => {
    try{
        const response = await Size.find({deleted_at: null, status: true });
        res.status(200).json({message: 'success', data: response});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    createSize,
    activeSizes
}