var express = require('express');
var router = express.Router();
const { body, validationResult } =require('express-validator')
const User = require('./user.model')
const bcrypt = require('bcryptjs')

router.post('/register',  
  // validation & sanitization
  [
    body(['username', 'password', 'confirmPassword']).notEmpty().trim().escape()
  ], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('errors:', errors)
      return res.status(422).json({errors: errors.array()})
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8)
    const newUser = {
      username: req.body.username,
      password: hashedPassword
    }

    User.create(newUser, (err, user) => {
      let error = err.errmsg
      if(error.includes('duplicate') && error.includes('index: username_1 dup key')) {
        return res.status(500).json({errmsg: 'Username taken'})
      }
    })
});

// router.post('/login', (req, res, next) => {
//   res.json('login page')
// });

router.post('/logout', (req, res, next) => {
  res.json('logged out')
});

module.exports = router;
