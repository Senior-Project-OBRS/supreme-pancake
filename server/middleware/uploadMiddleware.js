const multer = require('multer');
const util = require('util');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        // if (!fs.existsSync("public/refunds")) fs.mkdirSync("public/refunds");

        // callBack(null, 'public/refunds');
        callBack(null, 'public');
    },
    fileName: (req, file, callBack) => {
        callBack(null, Date.now() + file.originalname)
    },
});

const uploadFile = multer({
    storage: storage
}).single('image');

// used with async-await
const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;