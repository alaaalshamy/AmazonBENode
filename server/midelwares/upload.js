const multer = require('multer');
let pic;
var storage = multer.diskStorage({
     destination : function (req, file, cb) {
         
        cb(null,  './public/images/uploads')},
     filename: (req, file, cb) => {
        fileName = file.originalname;
        extention = fileName.split('.');
        ext = (extention[extention.length-1])? extention[extention.length-1] : '';
        pic = file.originalname +'_'+Date.now() +'.' + ext ;
        cb(null, pic)
    }
});
const upload = multer({ storage: storage })
module.exports = upload;