import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL ou clé anonyme manquante dans .env.local')
}

/**
 * @brief Client Supabase côté client (navigateur)
 * @description Permet d'effectuer les opérations d'authentification et de base de données
 * depuis React avec les clés publiques.
 */

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
