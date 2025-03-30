import { createClient } from "@supabase/supabase-js"

// These would normally come from environment variables
// For development, you can hardcode them here temporarily
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xjgfljqskxnpnyfeojzp.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZ2ZsanFza3hucG55ZmVvanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMDk3MjUsImV4cCI6MjA1ODg4NTcyNX0.RZ27KwgxTJ5ciwrTYG0iFt62-Kh9ZSAHquN1Qc5Nb_w"

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // This ensures that the redirect URLs are set to your deployed site
    // rather than localhost
    redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
  },
})

// Helper function for demo purposes
export const demoLogin = () => {
  // This function simulates a successful login
  return {
    user: {
      id: "demo-user-id",
      email: "demo@example.com",
      user_metadata: {
        full_name: "Demo User",
      },
    },
    session: {
      access_token: "demo-token",
    },
  }
}

// Function to save application data to Supabase
export const saveApplication = async (applicationData: any) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([
        { 
          ...applicationData,
          created_at: new Date().toISOString(),
          status: 'pending',
          user_id: supabase.auth.getUser().then(res => res.data.user?.id) || 'demo-user-id'
        }
      ])
      .select()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error saving application:', error)
    return { data: null, error }
  }
}

// Function to get all applications for the current user
export const getApplications = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user?.id || 'demo-user-id')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching applications:', error)
    return { data: null, error }
  }
}

// Function to get a single application by ID
export const getApplicationById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {

