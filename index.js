// Import a module

const { app } = require('./handles')

const PORT = 5000

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
