const express = require('express');
const router = express.Router();
const categoryModel = require('../models/categoryModel');

/* GET home page. */
router.get('/categories', (req, res, next) => {
    categoryModel.find().then((result) => {
        console.log(result);
        res.send(result).json();
    }, (err) => {
        console.log(err)
        res.json({ mess: err, state: false });
    });
});
router.post('/newCategory', (req, res) => {
    let { body: { category } } = req
    try {
        let finalCategory = new categoryModel(category);
        finalCategory.save((err, doc) => {
            if (doc) {
                console.log(doc)
                res.json({ mess: "category added", state: true });

            } else if (err) {
                res.json({ mess: err, state: false });
            };
        })
    } catch (err) {
        res.json({ mess: err, state: false });
    }
})
module.exports = router;
