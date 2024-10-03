const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const { MongoClient } = require('mongodb')


const url = 'mongodb://localhost:27017';
const dbname = 'temp_user_data';
const client = new MongoClient(url);

const config = async () => {
    await client.connect();

    const db = client.db(dbname);
    return db;
}



const app = express();
app.use(express.json());



const multerstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // console.log(file); 
        const ext = (path.extname(file.originalname));

        cb(null, Date.now() + Math.floor(Math.random() * 9999) + ext);
    }
});
///////****Single field with single file******///////
// const upload = multer({ storage: multerstorage }).single('image');



///////****Single field with Multiple file******///////
// const upload = multer({ storage: multerstorage }).array('image',10);


///////****Multiple fields******///////
const upload = multer({ storage: multerstorage }).fields([
    { name: 'images', maxCount: 10 },
    { name: 'thumbnail', maxCount: 1 },

]);

app.post('/insert-data', upload, async(req, res) => {

    const db = await config();
    const users = db.collection('user');



    try {
        const data = req.body;
        const files = req.files;
        console.log(req.body)

        // console.log(req.files);

        if (req.files) {
            data.thumbnail = req.files.thumbnail[0].filename;

            data.images = req.files.images.map((image) = (image.filename));
        }

        const response = await users.insertOne(data);

        res.status(200).json({ message: 'data added successfully', data: response });


        // if (req.file) {
        //     if (path.extname(req.file.filename) === '.jpg' || (path.extname(req.file.filename) === '.png')) {
        //         data.image = req.file.filename;
        //     }
        //     else {
        //         res.status(400).json({ message: 'image extension not valid' });

        //         fs.unlinkSync(path.join(__dirname, `uploads/${req.file.filename}`));
        //         return;
        //     }

        // }
        // console.log(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal serval error' });
    }
})
app.listen(1600, () => {
    console.log('server running port 1600');
});