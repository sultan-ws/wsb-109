const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:String,
    fb:String,
    insta:String,
    twitter:String,
    youtube:String,
    email:String,
    password:String,
    logo:String,
    favicon:String,
    footer_logo:String,
    thumbnail:String
});

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;