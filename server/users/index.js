var express = require('express');
var router = express.Router();
const { body, validationResult } =require('express-validator')
const User = require('./user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register',  
  // validation & sanitization
  [
    body(['username', 'password', 'confirmPassword']).notEmpty().trim().escape()
  ], async (req, res, next) => {
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
      if(err && err.errmsg.includes('duplicate') && err.errmsg.includes('index: username_1 dup key')) {
        return res.status(500).json({errmsg: 'Username taken'})
      }
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
      res.header('auth-token', token).json({ username: user.username, token})
    })
});

router.post('/login', 
  [
    body(['username', 'password']).notEmpty().trim().escape()
  ], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('errors:', errors)
      return res.status(422).json({errors: errors.array()})
    }
    
    User.findOne({username: req.body.username}, async (err, user) => {
      if(err) return res.status(500).json({errmsg: 'Error logging in'})
      if(!user) return res.status(404).json({errmsg: 'Username not found'})

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      console.log(validPassword)
      if(!validPassword) return res.status(401).json({auth: false, token: null, errmsg: 'Invalid username / password'})
      // issue token on valid pw
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
      res.header('auth-token', token).json({ username: user.username, token})
    })
});

router.get('/logout', (req, res, next) => {
  req.headers.authorization = null
  res.json({token: null, message: 'logged out'})
});

module.exports = router;
