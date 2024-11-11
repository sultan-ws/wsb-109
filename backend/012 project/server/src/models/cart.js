const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    }
    ,
    size:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sizes',
    },
    color:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors',
    },
    quentity:{
        type:Number,
        default:1
    }
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;