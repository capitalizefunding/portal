"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase, testSupabaseConnection } from "@/lib/supabase"
import { Loader2, ArrowLeft } from "lucide-react"

export default function DirectInsertTestPage() {
  const router = useRouter()
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [columns, setColumns] = useState<string[]>([])

  const testConnection = async () => {
    setIsLoading(true)
    setResult("Testing Supabase connection...")
    setError("")

    try {
      const { success, data, error } = await testSupabaseConnection()

      if (success) {
        setResult((prev) => prev + "\nConnection successful: " + JSON.stringify(data))
      } else {
        setError(error?.message || "Connection failed")
        setResult((prev) => prev + "\nConnection error: " + JSON.stringify(error))
      }
    } catch (err) {
      setError(err.message || "An exception occurred")
      setResult((prev) => prev + "\nException: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getTableColumns = async () => {
    setIsLoading(true)
    setResult("Getting table columns...")
    setError("")

    try {
      // Try to get column information using SQL
      const { data: columnData, error: columnError } = await supabase.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'applications';
      `)

      if (columnError) {
        setResult((prev) => prev + "\nError getting column info: " + JSON.stringify(columnError))
        setError(columnError.message || "Failed to get columns")
      } else if (columnData && columnData.length > 0) {
        const foundColumns = columnData.map((col) => col.column_name)
        setColumns(foundColumns)
        setResult((prev) => prev + "\nFound columns: " + foundColumns.join(", "))
      } else {
        setResult((prev) => prev + "\nNo columns found")
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
      // Create a test record with lowercase column names
      const testRecord = {
        legalbusinessname: "Test Business " + new Date().toISOString(),
        amountrequested: "50000",
        useoffunds: "Test Purpose",
        contactfirstname: "Test",
        contactlastname: "User",
        email: "test@example.com",
        phone: "555-123-4567",
      }

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
          <h2 className="text-2xl font-vectora-bold tracking-tight">Direct Insert Test</h2>
          <p className="text-muted-foreground font-vectora-roman">Test direct insertion into the applications table</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={testConnection} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
            <Button onClick={getTableColumns} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Columns...
                </>
              ) : (
                "Get Table Columns"
              )}
            </Button>
            <Button onClick={insertTestRecord} disabled={isLoading}>
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

