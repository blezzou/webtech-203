import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

// ----------------------
// Configuration
// ----------------------
dotenv.config({path: path.resolve(__dirname, '../.env')})
const app = (express as any)();

app.use(cors())
app.use((express as any).json())

// ----------------------
// Connexion à Supabase
// ----------------------
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(' Supabase non configuré. Vérifie ton fichier .env')
  process.exit(1)
}

// Dossier où se trouvent les routes
const routesPath = path.resolve('./src/routes')

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)


// Charger automatiquement toutes les routes
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const route = file.replace('.js', '')
    import(`./routes/${file}`).then((module) => {
      app.use(`/api/${route}`, module.default)
      console.log(`Route dynamique chargée : /api/${route}`)
    })
  }
})

app.get('/', (req, res) => {
  res.send('Backend Node.js avec routage dynamique')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// app.use(express.json())
// app.use('/api/users', userRoutes)
// app.use('/api/auth', authRoutes)

export default app

