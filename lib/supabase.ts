import { createClient } from "@supabase/supabase-js"

// These would normally come from environment variables
// For development, you can hardcode them here temporarily
const supabaseUrl = "https://xjgfljqskxnpnyfeojzp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZ2ZsanFza3hucG55ZmVvanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMDk3MjUsImV4cCI6MjA1ODg4NTcyNX0.RZ27KwgxTJ5ciwrTYG0iFt62-Kh9ZSAHquN1Qc5Nb_w"

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

