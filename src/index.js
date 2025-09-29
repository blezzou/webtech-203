const express = require('express')
const path = require('path')

const indexRouter = require('./routes/index')
const helloRouter = require('./routes/hello')
const aboutRouter = require('./routes/about')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/', indexRouter)
app.use('/hello', helloRouter)
app.use('/about', aboutRouter)

app.use((req, res) => {
  res.status(404).type('text/plain').send('404')
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
