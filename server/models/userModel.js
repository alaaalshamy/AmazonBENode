const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userModel = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    userMail: { type: String, require: true, unique: true },
    userName: { type: String, require: true },
    userPassword: { type: String, require: true },
    salt: String,
    role: String,
    status:Number,
    userAddress: { type: Schema.Types.ObjectId, ref: "addressModel" }
});

userModel.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.userPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userModel.methods.validatePassword = function (password) {
    const userPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.userPassword === userPassword;
};

userModel.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        userMail: this.userMail,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

userModel.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        userMail: this.userMail,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('userModel', userModel);
