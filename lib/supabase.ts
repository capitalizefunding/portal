import { createClient } from "@supabase/supabase-js"

// Use the provided credentials
const supabaseUrl = "https://xjgfljqskxnpnyfeojzp.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZ2ZsanFza3hucG55ZmVvanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMDk3MjUsImV4cCI6MjA1ODg4NTcyNX0.RZ27KwgxTJ5ciwrTYG0iFt62-Kh9ZSAHquN1Qc5Nb_w"

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Function to save application data to Supabase with detailed logging
export const saveApplication = async (applicationData: any) => {
  try {
    console.log("Starting saveApplication with data:", applicationData)

    // For demo purposes, we'll use a fixed user ID
    const userId = "demo-user-id"

    // Create a properly formatted application object
    const applicationToSave = {
      business_name: applicationData.businessName,
      amountrequested: applicationData.amount,
      purpose: applicationData.purpose,
      status: "pending",
      user_id: userId,
      created_at: new Date().toISOString(),
    }

    console.log("Formatted application data:", applicationToSave)

    // First, check if the applications table exists
    console.log("Checking if applications table exists...")
    const { data: tableCheck, error: tableCheckError } = await supabase.from("applications").select("count").limit(1)

    console.log("Table check result:", tableCheck, tableCheckError)

    // If the table doesn't exist, try to create it
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Applications table doesn't exist, attempting to create it")

      // Try to create the table
      try {
        const { data: createData, error: createError } = await supabase.query(`
          CREATE TABLE IF NOT EXISTS applications (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            business_name TEXT NOT NULL,
            amountrequested NUMERIC,
            purpose TEXT,
            status TEXT DEFAULT 'pending',
            user_id TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `)

        console.log("Create table result:", createData, createError)

        if (createError) {
          console.error("Error creating table:", createError)
        } else {
          console.log("Table created successfully")
        }
      } catch (createErr) {
        console.error("Exception creating applications table:", createErr)
      }
    }

    // Now try to insert the data
    console.log("Attempting to insert application data...")
    const { data, error } = await supabase.from("applications").insert([applicationToSave]).select()

    console.log("Insert result:", data, error)

    if (error) {
      console.error("Supabase insert error:", error)
      throw error
    }

    console.log("Application saved successfully to Supabase:", data)
    return { data, error: null }
  } catch (error: any) {
    console.error("Exception in saveApplication:", error)
    return { data: null, error }
  }
}

// Function to test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log("Testing Supabase connection...")

    // Try a simple query to test the connection
    const { data, error } = await supabase.from("applications").select("count")

    if (error) {
      console.error("Supabase connection test error:", error)
      return { success: false, error }
    }

    console.log("Supabase connection successful:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Exception testing Supabase connection:", error)
    return { success: false, error }
  }
}

export const getApplications = async () => {
  try {
    const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Error fetching applications from Supabase:", error)
    return { data: null, error }
  }
}

export const getApplicationById = async (id: string) => {
  try {
    const { data, error } = await supabase.from("applications").select("*").eq("id", id).single()

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    return data ? { data, error: null } : { data: null, error: "Application not found" }
  } catch (error: any) {
    console.error("Error fetching application from Supabase:", error)
    return { data: null, error }
  }
}

// Export the supabase client for direct use
export { supabase }

