import { Meteor } from 'meteor/meteor';

const uploadFile = require('../middleware/uploadMiddleware');

/* GET method */
const getImage = () => {

};

/* POST method */
const upload = async (req, res, next) => {
    try {
        // await uploadFile(req, res);

        if (!req.file) {
            console.log("No file upload");
            res.end("Please upload a file!")
        } else {
            console.log(req)
            // console.log(req.file.filename);
            // const imgsrc = 'http://127.0.0.1:3000/images' + req.file.filename
            res.end('Upload the file successfully')
        }
    } catch (err) {
        console.log(err);
        // next();
        // res.end(`Could not upload the file: `);
    }

    // next();
};

module.exports = {
    getImage,
    upload
}