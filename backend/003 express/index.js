const express = require('express');
const path = require('path');

const app = express();

const filePath = path.join(__dirname, 'public');

app.get('/greet/:name', (req, res)=>{

    console.log(req.query);

    console.log(req.params);
    res.send(`<span>hello: </span> <h1>${req.params.name}</h1>`);
});

app.get('/file', (req, res)=>{
    // res.send('hello avinash post');

    res.sendFile(`${filePath}/hello.html`)
});

app.get('/open-file', (req, res) => {
    res.sendFile(`${filePath}/dummy-pdf_2.pdf`);
});

app.listen(5200, ()=>{
    console.log('server is running on port 5200');
});

// 'https://dummyjson.com/products/search?q=phone'