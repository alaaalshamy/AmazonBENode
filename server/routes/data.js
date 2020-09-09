const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('./auth');
require('../config/passport');

const userModel = require('../models/userModel');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ mess: "hi" });
});
router.post('/adduser', auth.optional, (req, res) => {
  const { body: { user } } = req;
  console.log(user)
  user.status = 1; //1  for active user 
  user.role = user.role ? user.role : 'user'; // if user didn't get any roll make it normal user 
  if (!user.userMail) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if (!user.userPassword) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  userModel.findOne({ userMail: user.userMail }, function (err, userData) {
    if (err) {
      console.log(err);
      return;
    }
    if (userData == null) {
      const finalUser = new userModel(user);
      finalUser.setPassword(user.userPassword);
      return finalUser.save().then(
        () => res.json({
          user: finalUser.toAuthJSON()
        }));
    } else {
      return res.status(422).json({
        errors: {
          password: 'User already registered',
        },
      });
    }
  });
});
//user login
router.post('/login', auth.optional, function (req, res, next) {
  const { body: { user } } = req;
  console.log("ussssser", user)
  if (!user.userMail) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.userPassword) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    console.log("passportUser", passportUser)
    console.log("passportinfo", info)
    if (passportUser) {
      const user = passportUser;
      console.log("Data", { "user": user })
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    }
    return res.status(400).json(info);
  })(req, res, next);
});


module.exports = router;
