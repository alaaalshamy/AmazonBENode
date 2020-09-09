const mongoose = require('mongoose');
const { Schema } = mongoose;

const ownerModel = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    ownerName: { type: String },
    ownerImg:String,
    ownerAbout:String,
    creationDate: { type: Date, default: Date.now}
    
});
module.exports = mongoose.model('ownerModel', ownerModel);
