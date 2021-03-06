const express = require('express')
const router = express.Router()
const { body, validationResult } =require('express-validator')
let Bug = require('./bug.model')
const { verifyToken } = require('../middleware/auth')

/* GET home page. */
router.get('/', (req, res, next) => {
  Bug.find({})
    .then(bugs => res.json(bugs))
    .catch(err => res.status(400).json(`error: ${err}`))  
})

// POST new bug
router.post('/new', verifyToken,
  // validation & sanitization
  [ body(['summary', 'description']).notEmpty().trim().escape() ], 
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('errors:', errors)
      return res.status(422).json({errors: errors.array()})
    }

    const newBug = {
      summary: req.body.summary,
      description: req.body.description
    }

    Bug.create(newBug, (err, bug) => {
      if (err) return res.status(400).json(`error: ${err}`)
      res.json(bug)
    })
  }
)

// // PUT update a bug
// router.put('/edit/:id', (req, res, next) => {
//   Bug.findByIdAndUpdate(req.params.id, req.body, (err, updatedBug) => {
//     if (err) return res.status(400).json(`error: ${err}`)
//     res.json(updatedBug)
//   })
// })

// delete a bug
router.delete('/delete/:id', verifyToken, (req, res, next) => {
  Bug.deleteOne({_id: req.params.id}, (err) => {
    if (err) return res.status(400).json(`error: ${err}`)
    res.json('delete successful')
  })
})

module.exports = router;
