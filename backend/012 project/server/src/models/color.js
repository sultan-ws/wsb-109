const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: String,
    code:String,
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

colorSchema.pre('save', function(){
    this.created_at = new Date();
});

colorSchema.pre('insertOne', function(){
    this.created_at = new Date();
});

const Color = mongoose.model('colors', colorSchema);

module.exports = Color;