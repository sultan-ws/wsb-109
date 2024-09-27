const express = require('express');
const path = require('path');

const app = express();
const filePath = path.join(__dirname, 'public');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.sendFile(`${filePath}/home.html`)
})

app.get('/about', (req, res)=>{
    res.sendFile(`${filePath}/about.html`)
})

app.get('/contact', (req, res)=>{
    res.sendFile(`${filePath}/contact.html`)
})

app.get('*', (req, res)=>{
    res.sendFile(`${filePath}/404.html`)
});

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
})