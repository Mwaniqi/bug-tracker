var express = require('express');
var router = express.Router();

/* GET register */
router.post('/', (req, res, next) => {
  res.send('register');
});

router.get('/login', (req, res, next) => {
  res.send('login page')
});

router.get('/logout', (req, res, next) => {
  res.send('logged out')
});

module.exports = router;
