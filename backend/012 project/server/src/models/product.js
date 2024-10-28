const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description:String,
    short_description:String,
    price: Number,
    mrp: Number,
    parent_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_categories'
    },
    product_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_categories'
    },
    stock:{
        type: Boolean,
        default:true
    },
    brand:String,
    colors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors'
    }],
    sizes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'sizes'
    }],
    status:{
        type:Boolean,
        default:true
    },
    new_arrivals:{
        type:Boolean,
        default:false
    },
    thumbnail:String,
    image_animation:String,
    gallery:Object,
    created_at:Date,
    updated_at:{
        type:Date,
        default:Date.now
    },
    deleted_at:{
        type:Date,
        default: null
    }
});

productSchema.pre('save', function(){
    this.created_at = new Date();
});

productSchema.pre('insertOne', function(){
    this.created_at = new Date();
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;