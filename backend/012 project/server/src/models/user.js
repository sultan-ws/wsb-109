const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status:{
        type: String,
        default:true
    },
    created_at:Date,
    updated_at:Date,
    deleted_at:{
        type:Date,
        default: null
    }
});

userSchema.pre('save', function(){
    this.created_at = new Date();
});

userSchema.pre('insertOne', function(){
    this.created_at = new Date();
});

const User = mongoose.model('users', userSchema);

module.exports = User;