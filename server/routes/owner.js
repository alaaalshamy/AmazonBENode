const express = require('express');
const router = express.Router();
const OwnerModel = require('../models/ownerModel');
const upload = require('../midelwares/upload');

/* GET home page. */
router.get('/owners', (req, res, next) => {
    OwnerModel.find().then((result) => {
        console.log(result);
        res.send(result).json();
    }, (err) => {
        console.log(err)
        res.json({ mess: err, state: false });
    });
});
router.post('/newOwner',upload.single('ownerImg'), (req, res) => {
    let { body: { owner } } = req
    try {
        let finalOwner = new OwnerModel(owner);
        finalOwner.ownerImg=req.file.filename;
        finalOwner.save((err, doc) => {
            if (doc) {
                console.log(doc)
                res.json({ mess: "owner added", state: true });

            } else if (err) {
                res.json({ mess: err, state: false });
            };
        })
    } catch (err) {
        res.json({ mess: err, state: false });
    }
})
module.exports = router;
