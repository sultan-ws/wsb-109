const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:String,
    parent_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_categories'
    },
    slug:{
        type:String,
        required:true
    },
    description:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:Date,
    updated_at:Date,
    deleted_at:{
        type:Date,
        default: null
    }
});

categorySchema.pre('save', function(){
    this.created_at = new Date();
});

categorySchema.pre('insertOne', function(){
    this.created_at = new Date();
});

categorySchema.pre('updateOne', function(){
    this.updated_at = new Date();
});

categorySchema.pre('updateOne', function(){
    this.updated_at = new Date();
});

categorySchema.pre('findByIdAndUpdate', function(){
    this.updated_at = new Date();
});

const ProductCategory = mongoose.model('product_categories', categorySchema);

module.exports = ProductCategory;