const express = require('express')
const router = express.Router()

const NAME = 'Nicolas'

router.get('/', (req, res) => {
  const name = req.query.name
  if (!name) {
    return res.type('text').send('Hello anonymous')
  }

  if (name === NAME) {
    return res.type('text').send(`Bonjour ${name} !`)
  }

  return res.type('text').send(`Hello ${name}`)
})

module.exports = router
