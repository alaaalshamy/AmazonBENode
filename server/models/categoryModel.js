const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoryModel = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    categoryName: { type: String, require: true, unique: true },
    creationDate: { type: Date, default: Date.now}

});
module.exports = mongoose.model('categoryModel', categoryModel);
