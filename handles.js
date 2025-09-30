<<<<<<< HEAD
const fs = require('fs')
const path = require('path')
const express = require('express')
=======
// Necessary imports
const url = require('url')
const qs = require('querystring')
>>>>>>> 9f2e7b540ff714a80e9355b75f74afa93fd99a36

const app = express()

// Route de base
app.get('/', (req, res) => {
  res.status(200).send(`
    <h1>Bienvenue sur mon API</h1>
    <p>Essayez <a href="/hello?name=TonNom">/hello?name=TonNom</a></p>
    <p>Ou <a href="/about">/about</a></p>
  `)
})

// Route hello avec le nom
app.get('/hello', (req, res) => {
  const name = req.query.name

  if (!name) {
    return res.status(400)
  }
<<<<<<< HEAD

  if (name.toLowerCase() === 'nico') {
    return res.send('Bonjour, je suis Nico')
  }

  res.send(`Hello ${name}`)
})

// Route about
app.get('/about', (req, res) => {
  const aboutPath = path.join(__dirname, 'content', 'about.json')

  fs.readFile(aboutPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Erreur lecture fichier')
    }

    try {
      const aboutData = JSON.parse(data)
      res.json(aboutData)
    } catch (parseErr) {
      console.error(parseErr)
      res.status(500).send('Erreur')
    }
  })
})

module.exports = { app }
=======
}
>>>>>>> 9f2e7b540ff714a80e9355b75f74afa93fd99a36
