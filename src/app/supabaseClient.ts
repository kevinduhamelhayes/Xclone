import { createClient } from '@supabase/supabase-js'

// Obtén las variables de entorno para la URL y la clave anon de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verifica si las variables de entorno están definidas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined in the environment variables");
}

// Crea y exporta la instancia del cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
