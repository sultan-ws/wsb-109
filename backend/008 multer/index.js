const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(express.json());

const diskStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './uploads')
    },
    filename:(req, file, cb)=>{
        console.log(file);
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + Math.floor(Math.random() * 999999) + ext);
    }   
});

const upload = multer({storage:diskStorage}).single('thumbnail');

app.post('/upload-file',upload,(req, res)=>{
    console.log(req.body);
    console.log(req.file);
    res.send('hello devendra');
});

app.listen(5200, ()=>{
    console.log('Server is running on port 5200');
})