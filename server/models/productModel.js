const mongoose = require('mongoose');
const { Schema } = mongoose;

const productModel = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    productName: { type: String, require: true},
    productDes: { type: String},
    productImg :String,
    productStockNum:Number,
    productRating:[Number],
    productPrice:Number,
    productStatus:Boolean,
    productOwner: { type: Schema.Types.ObjectId, ref: "ownerModel" },
    productCategory: { type: Schema.Types.ObjectId, ref: "categoryModel"},
    creationDate: { type: Date, default: Date.now}

});
module.exports = mongoose.model('productModel', productModel);
