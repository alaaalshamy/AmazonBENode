const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
require('../models/userModel');

const Users = mongoose.model('userModel');

passport.use(new LocalStrategy({
  usernameField: 'user[userMail]',
  passwordField: 'user[userPassword]',
}, (userMail, userPassword, done) => {
  Users.findOne({ userMail })
    .then((user) => {
      if(!user || !user.validatePassword(userPassword)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));