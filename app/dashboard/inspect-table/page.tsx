"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { Loader2, ArrowLeft } from "lucide-react"

export default function InspectTablePage() {
  const router = useRouter()
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const inspectTable = async () => {
    setIsLoading(true)
    setResult("Inspecting applications table...")
    setError("")

    try {
      // First, check if the table exists
      const { data: tableExists, error: tableError } = await supabase.query(`
        SELECT EXISTS (
          SELECT FROM pg_tables
          WHERE schemaname = 'public'
          AND tablename = 'applications'
        );
      `)

      if (tableError) {
        setResult((prev) => prev + "\nError checking if table exists: " + JSON.stringify(tableError))
      } else {
        setResult((prev) => prev + "\nTable exists check: " + JSON.stringify(tableExists))
      }

      // Try to get a sample row to determine columns
      const { data, error } = await supabase.from("applications").select("*").limit(1)

      if (error) {
        setResult((prev) => prev + "\nError getting sample row: " + JSON.stringify(error))
      } else if (data && data.length > 0) {
        const columns = Object.keys(data[0])
        setResult((prev) => prev + "\nFound columns: " + columns.join(", "))

        // Show sample data
        setResult((prev) => prev + "\nSample data: " + JSON.stringify(data[0], null, 2))
      } else {
        setResult((prev) => prev + "\nTable exists but is empty")
      }

      // Try to get column information using SQL
      try {
        const { data: columnData, error: columnError } = await supabase.query(`
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns
          WHERE table_schema = 'public'
          AND table_name = 'applications';
        `)

        if (columnError) {
          setResult((prev) => prev + "\nError getting column info: " + JSON.stringify(columnError))
        } else {
          setResult((prev) => prev + "\nColumn information: " + JSON.stringify(columnData, null, 2))
        }
      } catch (sqlErr) {
        setResult((prev) => prev + "\nException getting column info: " + sqlErr.message)
      }
    } catch (err) {
      setError(err.message || "An exception occurred")
      setResult((prev) => prev + "\nException: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createTable = async () => {
    setIsLoading(true)
    setResult("Creating applications table...")
    setError("")

    try {
      // First, drop the table if it exists
      const { error: dropError } = await supabase.query(`
        DROP TABLE IF EXISTS applications;
      `)

      if (dropError) {
        setResult((prev) => prev + "\nError dropping table: " + JSON.stringify(dropError))
      } else {
        setResult((prev) => prev + "\nExisting table dropped successfully (if it existed)")
      }

      // Create the table with the correct schema
      const { error: createError } = await supabase.query(`
        CREATE TABLE applications (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          businessname TEXT NOT NULL,
          amountrequested NUMERIC,
          purpose TEXT,
          status TEXT DEFAULT 'pending',
          user_id TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

      if (createError) {
        setResult((prev) => prev + "\nError creating table: " + JSON.stringify(createError))
        throw createError
      }

      setResult((prev) => prev + "\nApplications table created successfully!")

      // Verify the table was created
      const { error: verifyError } = await supabase.from("applications").select("count").limit(1)

      if (verifyError) {
        setResult((prev) => prev + "\nError verifying table: " + JSON.stringify(verifyError))
        throw verifyError
      }

      setResult((prev) => prev + "\nVerified table exists!")

      // Try to insert a test record
      const testRecord = {
        businessname: "Test Business",
        amountrequested: 10000,
        purpose: "Test Purpose",
        status: "pending",
        user_id: "test-user",
        created_at: new Date().toISOString(),
      }

      const { data: insertData, error: insertError } = await supabase.from("applications").insert([testRecord]).select()

      if (insertError) {
        setResult((prev) => prev + "\nError inserting test record: " + JSON.stringify(insertError))
      } else {
        setResult((prev) => prev + "\nTest record inserted successfully: " + JSON.stringify(insertData))
      }
    } catch (err) {
      setError(err.message || "An exception occurred")
      setResult((prev) => prev + "\nException: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <div>
          <h2 className="text-2xl font-vectora-bold tracking-tight">Inspect Applications Table</h2>
          <p className="text-muted-foreground font-vectora-roman">
            Inspect and manage the applications table structure
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Table Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={inspectTable} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inspecting...
                </>
              ) : (
                "Inspect Table"
              )}
            </Button>
            <Button variant="outline" onClick={createTable} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create/Recreate Table"
              )}
            </Button>
          </div>

          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded">
            <p className="text-sm font-medium">Warning:</p>
            <p className="text-sm">
              The "Create/Recreate Table" action will drop the existing applications table if it exists and create a new
              one. Any existing data will be lost.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded mb-4">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-xs">{result || "No results yet"}</pre>
        </CardContent>
      </Card>
    </div>
  )
}

