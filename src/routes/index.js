const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const html = `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /><title>ECE AST - Lab</title></head>
  <body>
    <h1>Bienvenue</h1>
    <ul>
      <li><a href="/hello?name=John">/hello?name=John</a></li>
      <li><a href="/about">/about</a></li>
      <li><a href="/about/about">/about/about (dynamic)</a></li>
    </ul>
  </body>
</html>`
  res.type('html').send(html)
})

module.exports = router