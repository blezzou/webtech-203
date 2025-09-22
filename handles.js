// ./handles.js
// Necessary imports
const url = require('url')
const qs = require('querystring')

module.exports = {
  serverHandle: function (req, res) {
    const parsedUrl = url.parse(req.url)
    const path = parsedUrl.pathname
    const params = qs.parse(parsedUrl.query)

    if (path === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(`
        <h1>Bienvenue</h1>
        <p><a href="/hello?name=Nom">/hello?name=Nom</a></p>
      `)
      res.end()
    }

    else if (path === '/hello') {
      res.writeHead(200, { 'Content-Type': 'text/plain' })

      if ('name' in params) {
        if (params.name.toLowerCase() === 'Nico') {
          res.write("Bonjour, Je suis Nico ")
        } else {
          res.write("Hello " + params.name)
        }
      } else {
        res.write("Hello anonymous")
      }
      res.end()
    }
  }
}