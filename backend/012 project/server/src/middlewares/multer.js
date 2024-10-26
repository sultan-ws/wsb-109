const multer = require('multer');
const path = require('path');

const storage = (foldername)=> multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, `./src/uploads/${foldername}`)
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + Math.floor(Math.random() * 9999999) + path.extname(file.originalname));
    }
});

const uploads = (foldername)=> multer({storage: storage(foldername)})
.fields([
    {
        name:'thumbnail',
        maxCount: 1
    },
    {
        name:'logo',
        maxCount: 1
    },
    {
        name:'favicon',
        maxCount: 1
    },
    {
        name:'footer_icon',
        maxCount: 1
    },
    {
        name:'image_animation',
        maxCount: 1
    },
    {
        name:'product_gallery',
        maxCount: 10
    }
]);

module.exports = uploads;