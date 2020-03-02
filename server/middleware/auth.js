const User = require('../users/user.model')
const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization 
    if (token === 'null') return res.status(403).send({auth: false, message: 'No token'})

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(403).json({message: 'error verifying token'})
      }
      if (!token) return res.status(403).send({auth: false, message: 'Token authentication failed'})
      // if token is verified, proceed with next function
      next()
    })
  }
}