const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressModel = new Schema ({
   city:String,
});
module.exports =mongoose.model('addressModel',addressModel);
