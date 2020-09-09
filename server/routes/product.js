const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const upload = require('../midelwares/upload');

/* GET home page. */
router.get('/products', (req, res, next) => {
    productModel.find().then((result) => {
        console.log(result);
        res.send(result).json();
    }, (err) => {
        console.log(err)
        res.json({ mess: err, state: false });
    });
});
//add new product
router.post('/newProduct', upload.single('productImg'), async (req, res) => {
    // let { body: { product } } = req
    let product = req.body
    try {
        let finalProduct = new productModel(product);
        finalProduct.productImg = req.file.filename;
        await finalProduct.save((err, doc) => {
            if (doc) {
                console.log(doc)
                res.json({ mess: "product added", state: true });

            } else if (err) {
                res.json({ mess: err, state: false });
            };
        })
    } catch (err) {
        res.json({ mess: err, state: false });
    }
});
//get single product
router.get('/product/:id', (req, res, next) => {
    let id = req.params.id;
    productModel.findOne({ _id: id }).then((result) => {
        console.log(result);
        res.send(result).json();
    }, (err) => {
        console.log(err)
        res.json({ mess: err, state: false });
    });
});
router.put('/editProduct/:id', upload.single('productImg'), (req, res) => {
    let id = req.params.id;
    productModel.findOneAndUpdate({ _id: id }, {
        $set: {
            productName: req.body.productName,
            productDes: req.body.productDes,
            productImg: req.file.filename,
            productStockNum: req.body.productStockNum,
            productRating: req.body.productRating,
            productPrice: req.body.productPrice,
            productOwner: req.body.productOwner,
            productCategory: req.body.productCategory
        }
    },
        { upsert: true })
        .then((result) => {
            console.log(result);
            res.send(result).json();
        }, (err) => {
            console.log(err)
            res.json({ mess: err, state: false });
        });
});
// productStatus:req.body.productStatus,

// 5f57b2d179f84e28847e3b75
//update product 

module.exports = router;
