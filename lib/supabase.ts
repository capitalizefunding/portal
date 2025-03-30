import { createClient } from "@supabase/supabase-js"

// Use the provided credentials directly
const supabaseUrl = "https://xjgfljqskxnpnyfeojzp.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZ2ZsanFza3hucG55ZmVvanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMDk3MjUsImV4cCI6MjA1ODg4NTcyNX0.RZ27KwgxTJ5ciwrTYG0iFt62-Kh9ZSAHquN1Qc5Nb_w"

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Function to get table columns
export const getTableColumns = async (tableName: string) => {
  try {
    console.log(`Getting columns for table: ${tableName}`)

    // Try to get a sample row to determine columns
    const { data, error } = await supabase.from(tableName).select("*").limit(1)

    if (error) {
      console.error(`Error getting columns for ${tableName}:`, error)
      return { columns: null, error }
    }

    // If we have data, extract column names
    if (data && data.length > 0) {
      const columns = Object.keys(data[0])
      console.log(`Found columns for ${tableName}:`, columns)
      return { columns, error: null }
    }

    // If no data, try to insert a dummy row to get column names
    console.log(`No data in ${tableName}, trying to get columns another way...`)

    // Try a simple query to get column names
    const { data: columnsData, error: columnsError } = await supabase.rpc("get_table_columns", {
      table_name: tableName,
    })

    if (columnsError) {
      console.error(`Error getting columns with RPC for ${tableName}:`, columnsError)
      return { columns: null, error: columnsError }
    }

    if (columnsData && columnsData.length > 0) {
      const columns = columnsData.map((col) => col.column_name)
      console.log(`Found columns for ${tableName} using RPC:`, columns)
      return { columns, error: null }
    }

    return { columns: null, error: new Error(`Could not determine columns for ${tableName}`) }
  } catch (error) {
    console.error(`Exception getting columns for ${tableName}:`, error)
    return { columns: null, error }
  }
}

// Function to save application data to Supabase with detailed logging
export const saveApplication = async (applicationData: any) => {
  try {
    console.log("Starting saveApplication with data:", applicationData)

    // Create a properly formatted application object with the correct column names
    const applicationToSave = {
      // Business Info
      legalBusinessName: applicationData.businessName,
      useOfFunds: applicationData.purpose,
      amountRequested: applicationData.amount,

      // Contact Info (using defaults for demo)
      contactFirstName: applicationData.contactFirstName || "Demo",
      contactLastName: applicationData.contactLastName || "User",
      email: applicationData.email || "demo@example.com",
      phone: applicationData.phone || "555-123-4567",

      // Status (not in the schema but useful for tracking)
      status: "pending",

      // Add timestamp
      created_at: new Date().toISOString(),
    }

    console.log("Formatted application data:", applicationToSave)

    // Try a direct insert using the from() method which is more reliable
    console.log("Attempting direct insert with from() method...")
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

export const getApplications = async () => {
  try {
    if (!supabase) {
      throw new Error("Supabase client is not initialized")
    }

    const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase get applications error:", error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Error fetching applications:", error)
    return { data: null, error }
  }
}

// Function to test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log("Testing Supabase connection with URL:", supabaseUrl)
    console.log("Using anon key (first 10 chars):", supabaseKey.substring(0, 10) + "...")

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

export { supabase }

