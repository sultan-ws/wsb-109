const express = require('express');
const allRoutes = require('./src/app');
require('dotenv').config();
require('./src/db/config');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/franandoakservices/admin-panel', express.static(path.join(__dirname, 'src', 'uploads','product-category' )));
app.use('/franandoakservices/admin-panel', express.static(path.join(__dirname, 'src', 'uploads','admin' )));

app.use('/api',allRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});