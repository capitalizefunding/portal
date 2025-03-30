import { createClient } from "@supabase/supabase-js"

// These would normally come from environment variables
// For development, you can hardcode them here temporarily
const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

