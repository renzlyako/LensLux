import { createClient } from '@supabase/supabase-js'

// This pulls the values from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize the client
export const supabase = createClient(supabaseUrl, supabaseKey)