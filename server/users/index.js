var express = require('express');
var router = express.Router();

/* GET register */
router.get('/register', (req, res, next) => {
  res.json('register');
});

router.post('/register', (req, res, next) => {
  res.json('register');
});

router.get('/login', (req, res, next) => {
  res.json('login page')
});

router.get('/logout', (req, res, next) => {
  res.json('logged out')
});

module.exports = router;
