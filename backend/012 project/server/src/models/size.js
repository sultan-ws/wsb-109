const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    name: String,
    order:String,
    status:{
        type:Boolean,
        default: true
    },
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

sizeSchema.pre('save', function(){
    this.created_at = new Date();
});

sizeSchema.pre('insertOne', function(){
    this.created_at = new Date();
});

const Size = mongoose.model('sizes', sizeSchema);

module.exports = Size;