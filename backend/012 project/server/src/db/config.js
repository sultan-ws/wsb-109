const mongoose = require('mongoose');
const { registerAdmin } = require('../controllers/admin-panel/adminControllers');

const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPPASSWORD}@${process.env.DBCLUSTER}.${process.env.DBCODE}.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DBCLUSTER}`;

mongoose.connect(url)
.then(()=>{
    console.log('Connected to MongoDB');
    registerAdmin();
})
.catch((error)=>{
    console.error('unable to connect with database', error);
});