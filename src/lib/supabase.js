// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Debug: Verify environment variables are loaded
console.log("ENV URL:", import.meta.env.VITE_SUPABASE_URL)
console.log("ENV KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "Key loaded" : "Key missing")

// Test Supabase connection
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Test connection
supabase.from('articles').select('count').then(({ data, error }) => {
  console.log("Supabase connection test:", error ? "FAILED" : "SUCCESS")
  console.log("Error details:", error)
})
