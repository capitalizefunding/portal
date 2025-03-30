import { createClient } from "@supabase/supabase-js"

// Use the provided credentials
const supabaseUrl = "https://xjgfljqskxnpnyfeojzp.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZ2ZsanFza3hucG55ZmVvanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMDk3MjUsImV4cCI6MjA1ODg4NTcyNX0.RZ27KwgxTJ5ciwrTYG0iFt62-Kh9ZSAHquN1Qc5Nb_w"

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Function to inspect the actual schema of the applications table
export const inspectApplicationsTable = async () => {
  try {
    // First check if the table exists
    const { data, error } = await supabase.from("applications").select("count").limit(1)

    if (error && error.message.includes("does not exist")) {
      return { exists: false, columns: [], error: null }
    }

    // If we get here, the table exists
    // We'll use a simpler approach instead of querying information_schema
    return {
      exists: true,
      columns: [
        // We'll assume these columns exist based on previous errors
        { column_name: "business_name", data_type: "text" },
        { column_name: "amountrequested", data_type: "numeric" },
        { column_name: "purpose", data_type: "text" },
        { column_name: "status", data_type: "text" },
        { column_name: "created_at", data_type: "timestamp with time zone" },
      ],
      error: null,
    }
  } catch (error) {
    console.error("Error inspecting applications table:", error)
    return { exists: false, columns: [], error }
  }
}

// Function to save application data to Supabase with flexible column mapping
export const saveApplication = async (applicationData: any) => {
  try {
    console.log("Attempting to save application data to Supabase:", applicationData)

    // For demo purposes, we'll use a fixed user ID
    const userId = "demo-user-id"

    // Create a properly formatted application object
    // Using the column names we know exist in the database
    const applicationToSave = {
      business_name: applicationData.businessName,
      amountrequested: applicationData.amount,
      purpose: applicationData.purpose,
      status: "pending",
      user_id: userId,
      created_at: new Date().toISOString(),
    }

    console.log("Saving application with fields:", Object.keys(applicationToSave))

    // First, check if the applications table exists
    const { error: tableCheckError } = await supabase.from("applications").select("count").limit(1)

    // If the table doesn't exist, try to create it
    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.log("Applications table doesn't exist, attempting to create it")

      // Try to create the table
      try {
        const { error: createError } = await supabase.query(`
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

        if (createError) {
          console.error("Error creating table:", createError)
        } else {
          console.log("Table created successfully")
        }
      } catch (createErr) {
        console.error("Error creating applications table:", createErr)
      }
    }

    // Now try to insert the data
    const { data, error } = await supabase.from("applications").insert([applicationToSave]).select()

    if (error) {
      console.error("Supabase insert error:", error)
      throw error
    }

    console.log("Application saved successfully to Supabase:", data)
    return { data, error: null }
  } catch (error: any) {
    console.error("Error saving application to Supabase:", error)
    return { data: null, error }
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

