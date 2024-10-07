const multer = require("multer");
const path = require('path');

const uploads = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.floor(Math.random() * 99999) + path.extname(file.originalname))
    }
})}).fields([
    {
        name: 'images',
        maxCount: 5
    },
    {
        name: 'thumbnail',
        maxCount: 1
    }
]);

module.exports = uploads;