"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { Loader2, ArrowLeft } from "lucide-react"

export default function TableInspectorPage() {
  const router = useRouter()
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [columns, setColumns] = useState<string[]>([])

  const inspectTable = async () => {
    setIsLoading(true)
    setResult("Inspecting applications table...")
    setError("")

    try {
      // First check if the table exists
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

          if (columnData && columnData.length > 0) {
            const foundColumns = columnData.map((col) => col.column_name)
            setColumns(foundColumns)
            setResult((prev) => prev + "\n\nColumn names: " + foundColumns.join(", "))
          }
        }
      } catch (sqlErr) {
        setResult((prev) => prev + "\nException getting column info: " + sqlErr.message)
      }

      // Try to get a sample row to determine columns
      const { data, error } = await supabase.from("applications").select("*").limit(1)

      if (error) {
        setResult((prev) => prev + "\nError getting sample row: " + JSON.stringify(error))
      } else if (data && data.length > 0) {
        const sampleColumns = Object.keys(data[0])
        setResult((prev) => prev + "\n\nFound columns from sample: " + sampleColumns.join(", "))

        // Show sample data
        setResult((prev) => prev + "\nSample data: " + JSON.stringify(data[0], null, 2))
      } else {
        setResult((prev) => prev + "\nTable exists but is empty")
      }
    } catch (err) {
      setError(err.message || "An exception occurred")
      setResult((prev) => prev + "\nException: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const insertTestRecord = async () => {
    setIsLoading(true)
    setResult("Inserting test record...")
    setError("")

    try {
      if (columns.length === 0) {
        // If we don't have columns yet, try to get them
        try {
          const { data: columnData, error: columnError } = await supabase.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'applications';
          `)

          if (columnError) {
            setResult((prev) => prev + "\nError getting column info: " + JSON.stringify(columnError))
          } else if (columnData && columnData.length > 0) {
            const foundColumns = columnData.map((col) => col.column_name)
            setColumns(foundColumns)
            setResult((prev) => prev + "\nFound columns: " + foundColumns.join(", "))
          }
        } catch (sqlErr) {
          setResult((prev) => prev + "\nException getting column info: " + sqlErr.message)
        }
      }

      // Create a test record with lowercase column names
      const testRecord = {}

      // Add fields based on the columns we found
      if (columns.includes("legalbusinessname")) {
        testRecord["legalbusinessname"] = "Test Business " + new Date().toISOString()
      } else {
        // Try different variations
        testRecord["legalbusinessname"] = "Test Business " + new Date().toISOString()
      }

      if (columns.includes("amountrequested")) {
        testRecord["amountrequested"] = "50000"
      } else {
        // Try different variations
        testRecord["amountrequested"] = "50000"
      }

      if (columns.includes("useoffunds")) {
        testRecord["useoffunds"] = "Test Purpose"
      } else {
        // Try different variations
        testRecord["useoffunds"] = "Test Purpose"
      }

      // Contact info
      testRecord["contactfirstname"] = "Test"
      testRecord["contactlastname"] = "User"
      testRecord["email"] = "test@example.com"
      testRecord["phone"] = "555-123-4567"

      setResult((prev) => prev + "\nTest record: " + JSON.stringify(testRecord))

      // Try direct insert
      const { data, error } = await supabase.from("applications").insert([testRecord]).select()

      if (error) {
        setError(error.message || "Insert failed")
        setResult((prev) => prev + "\nInsert error: " + JSON.stringify(error))
      } else {
        setResult((prev) => prev + "\nInsert successful: " + JSON.stringify(data))
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
          <h2 className="text-2xl font-vectora-bold tracking-tight">Table Inspector</h2>
          <p className="text-muted-foreground font-vectora-roman">
            Inspect the applications table and insert test data
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
            <Button variant="outline" onClick={insertTestRecord} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inserting...
                </>
              ) : (
                "Insert Test Record"
              )}
            </Button>
          </div>

          {columns.length > 0 && (
            <div className="mt-4">
              <p className="font-medium">Available Columns:</p>
              <ul className="list-disc pl-5">
                {columns.map((col, index) => (
                  <li key={index}>{col}</li>
                ))}
              </ul>
            </div>
          )}
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

