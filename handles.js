// Necessary imports
const url = require('url')
const qs = require('querystring')

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

}
